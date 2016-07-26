exports.azuread  = {
	redirectUri: 'http://localhost:3000',
	identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
	clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
	tenantName: 'fabrikamb2c.onmicrosoft.com',
	signInPolicy: 'b2c_1_sign_in',
	signUpPolicy: 'b2c_1_sign_up',
	editProfilePolicy: 'b2c_1_edit_profile',
};
