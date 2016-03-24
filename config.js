  // Don't commit this file to your public repos. This config is for first-run
  //
 exports.creds = {
 	returnURL: 'http://localhost:3000',
 	identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
 	clientID: 'ac55a187-c663-4236-970c-65807dc4413d',
 	skipUserProfile: true, // for AzureAD should be set to true.
 	responseType: 'id_token', // for login only flows use id_token. For accessing resources use `id_token code`
 	responseMode: 'form_post', // For login only flows we should have token passed back to us in a POST
 	// scope: ['email', 'profile'], // additional scopes you may wish to pass
 	tenantName: 'zeissb2cdev.onmicrosoft.com', 
 	validateIssuer: true, // if you have validation on, you cannot have users from multiple tenants sign in
 	passReqToCallback: false,
 	loggingLevel: 'info' // valid are 'info', 'warn', 'error'. Error always goes to stderr in Unix.     
 	};
