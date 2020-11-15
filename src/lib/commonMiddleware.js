import middy from '@middy/core';
import httpJsonParser from '@middy/http-json-body-parser'; // automatically stringify our json body
import httpEventNormalizer from '@middy/http-event-normalizer'; // automatically ajust Api Gateway event object to prevent us from accidentally having no existing object 
import httpErrorHandler from '@middy/http-error-handler'; // help handling error smooth easy and clean by working with http-error npm package


export default handler =>  middy(handler)
.use([
    httpJsonParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
]);