# HTTP API Guide
Freebird's API helps you to call the rest endpoints of your Web Application.This let's the user know what is the price for the trip , do the purchase transaction and so on.
To get started quickly, Freebird's API has been built using Javascript and can be integrated easily with you application.

### Accessing JS objects
To allow access to the Freebird API , user first needs to authenticate himself using the access token which he will receive once he successfully registers with the Freebird.

a GET request to the /v1/authenticate endpoint for Authentication of the Auth Token.

<pre><code>
 fBird.get('/v1/authenticate', authorizationBasic).then(function(result) {<br/>
   console.log('Access token is', result.message);
 };
</code></pre>
where, authorizationBasic is "userName:password" - userName and password will be provided to you by Freebird on successful registration.

### Client-side Javascript

<pre><code><script src="./sdk.js"></script></code></pre>
Add the above Freebird SDK Script in your HTML or JS Files.

Your Web Application can use our API to purchase the Freebird service by adding the trip price into the purchase data and return you the purchase ID.

<pre><code>
fBird.post('/v1/purchase', purchase, accessToken, headerChange) .then(function(result) {
   console.log('purchase API result ', result);
});
</code></pre>


# HTTP API Wrappers
The SDK provides easy access to all HTTP endpoints through the fBird.get, fBird.post, fBird.getToken methods. You can check for the API methods <a href="./../typedef/index.html#static-typedef-fBird">here</a>.

### API Documentation

#### fBird.get(path, [params])
Execute a GET request.

Parameters:

path (String): the path to the requested resource e.g. '/v1/authentication'<br/>
params (Object, optional): an object of additional parameters to pass in the request.

Returns: A promise that will resolve with the requested resource

#### fBird.post(path, [params])
Execute a POST request.

Parameters:

path (String): the path to the requested resource e.g. '/v1/pricing'<br/>
params (Object, FormData optional): an object of additional parameters to pass in the request.

Returns: A promise that will resolve with the requested resource

### API Internal Functions

To know more about the internal API working, you can have a look over these <a href="./../function/index.html#static-function-request">methods</a>.


