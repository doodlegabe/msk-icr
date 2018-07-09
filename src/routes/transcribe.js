'use strict';

require('dotenv').config('../../.env');
import request from 'request-promise'
import validUrl from 'valid-url'
import ImageUploader from '../image-uploader';
import vision from '@google-cloud/vision';
import microsofComputerVision from 'microsoft-computer-vision';

let visionClient;
if (process.env.MODE === 'local') {
  visionClient = new vision.ImageAnnotatorClient(
    {
      keyFilename: 'google-creds.json'
    }
  );
} else {
  visionClient = new vision.ImageAnnotatorClient();
}

/**
 * Filter for showing only active services
 * @param item
 * @returns {boolean}
 */
function activeProviderFilter(item) {
  return Boolean(item.active);
}

/**
 * Validates the requested providers with the active/existing providers. Returns false if no problem or an error string
 * when problems occur.
 * @param providers
 * @param requestedProviders
 * @returns {boolean | string }
 */
function providerDoNotExist(providers, requestedProviders) {
  let errors = [];
  const activeProviders = providers.filter(activeProviderFilter);
  const check = activeProviders.map(p => p.apiId);
  for (let i = 0; i < requestedProviders.length; i++) {
    if (!check.includes(requestedProviders[i])) {
      errors.push(requestedProviders[i] + ' is not currently available as a provider.');
    }
  }
  if (errors.length) {
    return errors.join(' ');
  } else {
    return false;
  }
}

/**
 * Changes the requested providers to all valid providers.
 * @param providerResponse
 * @returns {string[]}
 */
function createAllProviderList(providerResponse) {
  let newProviders = [];
  for (let i = 0; i < providerResponse.length; i++) {
    if (providerResponse[i].active) {
      newProviders.push(providerResponse[i].apiId)
    }
  }
  return newProviders;
}

/**
 * Checks if Image URI is invalid and returns error if true.
 * @param uri
 * @returns {boolean | string}
 */
function invalidateImageUri(uri) {
  if (validUrl.isUri(uri)) {
    return false;
  } else {
    return "Image URI, " + uri + ", appears to be invalid."
  }
}

/**
 * It returns an db id from an API id
 * @param providers
 * @param apiID
 * @returns {*}
 */
function getIdFromApiId(providers, apiID) {
  for (let i = 0; i < providers.length; i++) {
    if (providers[i].apiId === apiID) {
      return providers[i].id
    }
  }
}

/**
 * Changes object to transcription string.
 * @param response
 * @returns {string}
 */
function parseAzureResponse(response) {
  const words = [];
  for(let i=0; i<response.regions.length; i++){
    for(let j=0; j<response.regions[i].lines.length; j++){
      for(let k=0; k<response.regions[i].lines[j].words.length; k++){
        words.push(response.regions[i].lines[j].words[k].text);
      }
    }
  }
  return words.join(' ');
}

function transcribePerProvider(req, res, allProviders) {
  const transcriptionsContainer = [];
  if (req.body.providers.includes('google')) {
    const providerId = getIdFromApiId(allProviders, 'google');
    visionClient
      .textDetection({
        image: {
          source: {
            imageUri: req.body.imageUri
          }
        }
      })
      .then(results => {
        const transcriptions = results[0].textAnnotations;
        let transcriptionResult = '';
        transcriptions.forEach(txt => transcriptionResult += txt.description);
        request({
          "method": "POST",
          "uri": process.env.HOST + ":" + process.env.PORT + "/transcription/create",
          "json": true,
          "headers": {
            "User-Agent": "Self"
          },
          "body": {
            "text": transcriptionResult,
            "imageId": req.body.imageId,
            "providerId": providerId
          }
        }).then(function (transcriptionCreationResponse, transcriptionCreationErr) {
          if (transcriptionCreationResponse) {

            transcriptionsContainer.push(transcriptionCreationResponse);
            if(transcriptionsContainer.length>=req.body.providers.length){
              res.status(201).send({transcriptions: transcriptionsContainer});
            }

          } else {
            res.status(500).send({error: transcriptionCreationErr});
          }
        })
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }
  if (req.body.providers.includes('microsoft')) {
    const providerId = getIdFromApiId(allProviders, 'microsoft');
    microsofComputerVision.orcImage({
      "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_API_KEY_1,
      "request-origin": process.env.MICROSOSFT_REQUEST_REGION,
      "content-type": "application/json",
      "url": req.body.imageUri,
      "language": process.env.MICROSOFT_LANGUAGE,
      "detect-orientation": true
    }).then((result) => {
      const transcriptions = parseAzureResponse(result);
      request({
        "method": "POST",
        "uri": process.env.HOST + ":" + process.env.PORT + "/transcription/create",
        "json": true,
        "headers": {
          "User-Agent": "Self"
        },
        "body": {
          "text": transcriptions,
          "imageId": req.body.imageId,
          "providerId": providerId
        }
      }).then(function (transcriptionCreationResponse, transcriptionCreationErr) {
        if (transcriptionCreationResponse) {
          transcriptionsContainer.push(transcriptionCreationResponse);
          if(transcriptionsContainer.length>=req.body.providers.length){
            res.status(201).send({transcriptions: transcriptionsContainer});
          }
        } else {
          res.status(500).send({error: transcriptionCreationErr});
        }
      })
    })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }
  if (req.body.providers.includes('flexi')) {
    transcriptionsContainer.push({id:'0',text:'placeholder'});
    transcriptionsContainer.push(transcriptionCreationResponse);
    if(transcriptionsContainer.length>=req.body.providers.length){
      res.status(201).send({transcriptions: transcriptionsContainer});
    }

  }
}

/**
 * Ensures the provider and URI are valid.
 * @param req
 * @param res
 */
function preProcess(req, res) {
  if (req.body.imageUri) {
    if (invalidateImageUri(req.body.imageUri)) {
      let err = invalidateImageUri(req.body.imageUri);
      res.status(500).send({error: err});
    } else {
      request({
        "method": "POST",
        "uri": process.env.HOST + ":" + process.env.PORT + "/image/create",
        "json": true,
        "headers": {
          "User-Agent": "Self"
        },
        "body": {
          "uri": req.body.imageUri
        }
      }).then(function (imageCreationResponse, imageCreationErr) {
        if (imageCreationResponse) {
          req.body.imageId = imageCreationResponse.id;
          request({
            "method": "GET",
            "uri": process.env.HOST + ":" + process.env.PORT + "/providers",
            "json": true,
            "headers": {
              "User-Agent": "Self"
            }
          }).then(function (providerResponse, providerErr) {
            if (providerResponse) {
              const requestedProviders = req.body.providers;
              if (!requestedProviders || requestedProviders.length === 0) {
                req.body.providers = createAllProviderList(providerResponse);
              } else {
                if (!Array.isArray(requestedProviders)) {
                  req.body.providers = [requestedProviders];
                }
                if (providerDoNotExist(providerResponse, req.body)) {
                  let noExistErr = providerDoNotExist(providerResponse, req.body);
                  res.status(500).send({error: noExistErr});
                }
              }
              if (requestedProviders) {
                transcribePerProvider(req, res, providerResponse);
              } else {
                res.status(500).send({error: 'Unable to parse providers'});
              }
            } else {
              res.status(500).send({error: providerErr});
            }
          });
        } else {
          res.status(500).send({error: imageCreationErr});
        }
      });
    }
  } else {
    res.status(500).send({error: 'No image file or URI sent.'});
  }
}

/**
 * Transcribes an Image URI or Image file.
 * @param req - Request Object
 * @param res - Response Object
 */
exports.doTranscribe = function (req, res) {
  let mutableRequest = req;
  let file;
  try {
    file = req.files[0].path;
  } catch (err) {
    file = null;
  }
  if (file) {
    ImageUploader.uploader.upload(file, function (result) {
      if (result.url) {
        request({
          "method": "POST",
          "uri": process.env.HOST + ":" + process.env.PORT + "/delete-temp",
          "json": true,
          "headers": {
            "User-Agent": "Self"
          },
          "body": {
            "filePath": file
          }
        }).then(function (deletionResponse, err) {
          if (!err && deletionResponse.success) {
            mutableRequest.body.imageUri = result.url;
            preProcess(mutableRequest, res);
          } else {
            res.status(500).send({error: err});
          }
        });
      } else {
        res.status(500).send({error: result});
      }
    });
  } else {
    preProcess(req, res);
  }
};
