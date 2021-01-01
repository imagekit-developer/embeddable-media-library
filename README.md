# Embeddable Media Library

# Usage

Serve the `sample-app` as follows:

```
cd samples/sample-app
npm i
npm start
```

Or, simply open `samples/sample-app/index.html` in any browser. (Firefox recommended.)

For HTTPS mode on localhost, see further below.

## Configure IK_HOST

The constant `IK_HOST` defines the dashboard instance used as the iframe source in the plugin. Its default value is `https://stage-eml.imagekit.io`.
This can be changed in the first few lines of `src/imagekit-eml.js`.

## Simple HTTPS on localhost

For the sample-app to be served over `https`, create a simple SSL certificate using `mkcert` tool.

Installation:

```
brew install mkcert
```

Generate the certificate:

```
cd samples/sample-app/
mkcert -install
mkcert localhost
```

Restart Firefox browser in order for the certificate to take effect.

Now, serve the sample-app securely:

```
npm run start:secure
```

The app should be available on `https://localhost:8080`. 
