#Azure Active Directory OIDC Web Sample

This Node.js app will give you with a quick and easy way to set up a Web application in node.js with Express using OpenID Connect. The sample server included in the download are designed to run on any platform.

We've released all of the source code for this example in GitHub under an MIT license, so feel free to clone (or even better, fork!) and provide feedback on the forums.


## Quick Start

Getting started with the sample is easy. It is configured to run out of the box with minimal setup.

### Step 1: Register a web application in B2C Azure AD Tenant

If you don't have an Azure AD B2C Tenant yet, please [create one](https://azure.microsoft.com/en-us/documentation/articles/active-directory-b2c-get-started/).

Next let's register a web application in your tenant.

* In the main page of your tenant, click `Manage B2C settings`, and you will be redirected to the settings page.

* Click `Applications`, then click `Add`. Enter a name like 'my_b2c_app', and switch the `Web App / Web API` option to yes. After that, enter 'http://localhost:3000/auth/openid/return' into the `Reply URL` field. Then click `Generate key` to generate a app key, and save it somewhere. This app key is the client secret of your application. Now click `Create` button to finish registration.

* Click the application you just created, copy the `Application ID` field and save it somewhere. This value is the clientID of your application.

* Now let's add some policies we will use for this sample. In the setting page, add a sign-in policy, a sign-up poligy, a profile-editing policy and a password-reset policy. When you add the policies, use the names 'signin', 'signup', 'updateprofile' and 'resetpassword' respectively. For `Identity providers`, choose `Email signup`; for `Application claims`, choose `Email Addresses`, `User's Object ID` and any other claims you want; for `Sign-up attributes`, choose `Email Address` and anything else you like.

* Now we have a B2C web application and policies registered. Note that Azure AD adds a 'B2C_1_' prefix automatically to all policy names, so the policy names we will use are actually 'B2C_1_signin', 'B2C_1_signup', 'B2C_1_updateprofile' and 'B2C_1_resetpassword'. 

### Step 2: Download node.js for your platform
To successfully use this sample, you need a working installation of Node.js.

### Step 3: Download the Sample application and modules

Next, clone the sample repo and install the NPM.

From your shell or command line:

* `$ git clone git@github.com:AzureADQuickStarts/B2C-WebApp-OpenIDConnect-NodeJS.git`
* `$ npm install`

### Step 4: Configure your server

* Provide the parameters in `exports.creds` in config.js as instructed.

* Update `exports.destroySessionUrl` in config.js, using your tenant name and signin policy name. If you want to redirect the users to a different url after they log out, update the  `post_logout_redirect_uri` part as well.

* Set `exports.useMongoDBSessionStore` in config.js to false, if you want to use the
default session store for `express-session`. Note that the default session store is
not suitable for production, you must use mongoDB or other [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

* Update `exports.databaseUri`, if you want to use mongoDB session store and a different database uri.

* Update `exports.mongoDBSessionMaxAge`. Here you can specify how long you want
to keep a session in mongoDB. The unit is second(s).

### Step 5: Run the application

* Start mongoDB service.

If you are using mongoDB session store in this app, you have to install mongoDB and start the service first. If you are using the default session store, you can skip this step.

* Run the app.

Use the following command in terminal.

* `$ node app.js`

**Is the server output hard to understand?:** We use `bunyan` for logging in this sample. The console won't make much sense to you unless you also install bunyan and run the server like above but pipe it through the bunyan binary:

* `$ npm install -g bunyan`
* `$ node app.js | bunyan`

### You're done!

You will have a server successfully running on `http://localhost:3000`.

### Acknowledgements

We would like to acknowledge the folks who own/contribute to the following projects for their support of Azure Active Directory and their libraries that were used to build this sample. In places where we forked these libraries to add additional functionality, we ensured that the chain of forking remains intact so you can navigate back to the original package. Working with such great partners in the open source community clearly illustrates what open collaboration can accomplish. Thank you!


## About The Code

Code hosted on GitHub under MIT license
