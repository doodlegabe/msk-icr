const providerList = [
  {
    apiId: "google",
    name:"Google Vision API",
    description: "Google Cloud Vision API enables developers to understand the content of an image by encapsulating powerful machine learning models in an easy to use REST API. It quickly classifies images into thousands of categories (e.g., \"sailboat\", \"lion\", \"Eiffel Tower\"), detects individual objects and faces within images, and finds and reads printed words contained within images. You can build metadata on your image catalog, moderate offensive content, or enable new marketing scenarios through image sentiment analysis. Analyze images uploaded in the request or integrate with your image storage on Google Cloud Storage.",
    documentation: "https://cloud.google.com/vision/docs/",
    active: true
  },
  {
    apiId: "flexi",
    name: "Flexicapture",
    description:"\n" +
    "ABBYY FlexiCapture is a highly scalable platform for intelligent data and document capture which can be successfully used to extract data from unstructured as well as structured paper documents, scans, e-mail messages, and other sources for subsequent use in document management systems. The four basic data extraction operations in ABBYY FlexiCapture include classification, optical recognition, verification, and export to ERP, ECM or BPM systems.",
    documentation: "http://help.abbyy.com/en-us/flexicapture/12/developer/introduction_ag",
    active: true
  },
  {
    apiId: "microsoft",
    name: "Azure Computer Vision",
    description:"The Computer Vision API provides state-of-the-art algorithms to process images and return information. For example, it can be used to determine if an image contains mature content, or it can be used to find all the faces in an image. It also has other features like estimating dominant and accent colors, categorizing the content of images, and describing an image with complete English sentences. Additionally, it can also intelligently generate images thumbnails for displaying large images effectively.",
    documentation: "https://westus.dev.cognitive.microsoft.com/docs/services/5adf991815e1060e6355ad44/operations/56f91f2e778daf14a499e1fa",
    active: true
  }
];

export default providerList;