  // Don't commit this file to your public repos. This config is for first-run
  //
 exports.creds = {
 	returnURL: 'http://localhost:3000/auth/openid/return',
 	identityMetadata: 'https://login.microsoftonline.com/isasample.site/v2.0/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
 	clientID: '4fda65a7-b651-4e72-b7c8-8d73c8381a2a',
 	clientSecret: ',kS1-Lk4O&Onpg(0', // if you are doing code or id_token code
 	skipUserProfile: true, // for AzureAD should be set to true.
 	responseType: 'id_token', // for login only flows use id_token. For accessing resources use `id_token code`
 	responseMode: 'form_post', // For login only flows we should have token passed back to us in a POST
 	//scope: ['email', 'profile'] // additional scopes you may wish to pass
 	tenantName: 'isasample.site'
 	};
