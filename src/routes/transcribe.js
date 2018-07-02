'use strict';

require('dotenv').config('../../.env');
import request from 'request-promise'
import validUrl from 'valid-url'
import ImageUploader from '../image-uploader';


/**
 * Filter for showing only active services
 * @param item
 * @returns {boolean}
 */
function activeProviderFilter (item){
  return Boolean(item.active);
}
/**
 * Validates the requested providers with the active/existing providers. Returns false if no problem or an error string
 * when problems occur.
 * @param providers
 * @param requestedProviders
 * @returns {boolean | string }
 */
function providerDoNotExist(providers, requestedProviders){
  let errors = [];
  const activeProviders = providers.filter(activeProviderFilter);
  const check = activeProviders.map(p => p.apiId);
  for(let i=0; i<requestedProviders.length; i++){
    if(!check.includes(requestedProviders[i])){
      errors.push(requestedProviders[i] + ' is not currently available as a provider.');
    }
  }
  if(errors.length){
    return errors.join(' ');
  }else{
    return false;
  }
}
/**
 * Changes the requested providers to all valid providers.
 * @param providerResponse
 * @returns {string[]}
 */
function createAllProviderList(providerResponse){
  let newProviders = [];
  for(let i=0; i<providerResponse.length; i++){
    if(providerResponse[i].active){
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
function invalidateImageUri(uri){
  if(validUrl.isUri(uri)){
    return false;
  } else {
    return "Image URI, " + uri + ", appears to be invalid."
  }
}


function transcribePerProvider(req, res){

}

/**
 * Ensures the provider and URI are valid.
 * @param req
 * @param res
 */
function preProcess(req, res){
  if(req.body.imageUri){
    if(invalidateImageUri(req.body.imageUri)){
      let err = invalidateImageUri(req.body.imageUri);
      res.status(500).send({error: err});
    }else{
      request({
        "method":"GET",
        "uri": process.env.HOST + ":" + process.env.PORT + "/providers",
        "json": true,
        "headers": {
          "User-Agent": "Self"
        }
      }).then(function(providerResponse, err){
        if(providerResponse){
          const requestedProviders = req.body.providers;
          if(!requestedProviders || requestedProviders.length === 0){
            req.body.providers = createAllProviderList(providerResponse);
          }else{
            if(!Array.isArray(requestedProviders)){
              req.body.providers = [requestedProviders];
            }
            if(providerDoNotExist(providerResponse,req.body.providers)){
              err = providerDoNotExist(providerResponse, req.body.providers);
              res.status(500).send({error: err});
            }
          }
          if(req.body.providers){




            res.status(200).send({success: true, message:'proceed from here'});




          }else{
            res.status(500).send({error: 'Unable to parse providers'});
          }
        }else{
          res.status(500).send({error: err});
        }
      });
    }
  }else{
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
  try{
    file = req.files[0].path;
  } catch (err){
    file = null;
  }
    if(file){
      ImageUploader.uploader.upload(file, function(result){
        if(result.url){
          request({
            "method":"POST",
            "uri": process.env.HOST + ":" + process.env.PORT + "/delete-temp",
            "json": true,
            "headers": {
              "User-Agent": "Self"
            },
            "body": {
              "filePath": file
            }
          }).then(function(deletionResponse, err){
            if(!err && deletionResponse.success){
              mutableRequest.body.imageUri = result.url;
              preProcess(mutableRequest,res);
            }else{
              res.status(500).send({error: err});
            }
          });
        }else{
          res.status(500).send({error: result});
        }
      });
    }else{
      preProcess(req,res);
    }
};