
exports.creds = {
  // Required. It must be tenant-specific endpoint, common endpoint is not supported to use B2C
  // feature.
  identityMetadata: 'https://login.microsoftonline.com/<tenant_name>.onmicrosoft.com/v2.0/.well-known/openid-configuration', 
  // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/v2.0/.well-known/openid-configuration'

  // Required, the client ID of your app in AAD  
  clientID: '<your_client_id>',

  // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token' 
  // If you want to get access_token, you must be 'code', 'code id_token' or 'id_token code'
  responseType: 'code id_token', 

  // Required
  responseMode: 'form_post', 

  // Required, the reply URL registered in AAD for your app
  redirectUrl: 'http://localhost:3000/auth/openid/return', 

  // Required if we use http for redirectUrl
  allowHttpForRedirectUrl: true,
  
  // Required if `responseType` is 'code', 'id_token code' or 'code id_token'. 
  // If app key contains '\', replace it with '\\'.
  clientSecret: '<your_client_secret>', 

  // Required, must be true for B2C
  isB2C: true,

  // Required to set to false if you don't want to validate issuer
  validateIssuer: true,

  // Required if you want to provide the issuer(s) you want to validate instead of using the issuer from metadata
  issuer: null,

  // Required to set to true if the `verify` function has 'req' as the first parameter
  passReqToCallback: false,

  // Optional. The additional scope you want besides 'openid'
  // (1) if you want refresh_token, use 'offline_access'
  // (2) if you want access_token, use the clientID
  scope: ['offline_access'],

  // Optional, 'error', 'warn' or 'info'
  loggingLevel: 'info',

  // optional. The lifetime of nonce in session. Default is 3600 (seconds).
  nonceLifetime: null,
};

// The url you need to go to destroy the session with AAD, 
// replace <tenant_name> with your tenant name, and
// replace <signin_policy_name> with your signin policy name.
exports.destroySessionUrl = 
  'https://login.microsoftonline.com/<tenant_name>.onmicrosoft.com/oauth2/v2.0/logout' +
  '?p=<signin_policy_name>' +
  '&post_logout_redirect_uri=http://localhost:3000';

// If you want to use the mongoDB session store for session middleware; otherwise we will use the default
// session store provided by express-session.
// Note that the default session store is designed for development purpose only.
exports.useMongoDBSessionStore = true;

// If you want to use mongoDB, provide the uri here for the database.
exports.databaseUri = 'mongodb://localhost/OIDCStrategy';

// How long you want to keep session in mongoDB.
exports.mongoDBSessionMaxAge = 24 * 60 * 60;  // 1 day (unit is second)