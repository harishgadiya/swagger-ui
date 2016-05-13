/**
 * Created by priyanka on 22/4/16.
 */
/**
 * fBird is another global object including various calls like GET and POST calls.
 * @typedef {Object} fBird
 */

/**
 * fBird.get takes the auth Token and does the authentication for the user.
 * @typedef  { } fBird.get Execute a GET request.
 * @property {string} path To the requested resource
 * @property {object} [params] Object of additional parameters
 */

/**
 * fBird.post returns with a request call on the pricing endpoint.
 * @typedef  { } fBird.post Execute a PUT request.
 * @property {string} path To the requested resource
 * @property {object} [params] Object of additional parameters
 */

/**
 * XMLHttpRequest is a global object with a Fake XMLHttpRequest function ( useFakeXMLHttpRequest() ) to run the SDK test cases.
 * @typedef {Object} XMLHttpRequest
 */