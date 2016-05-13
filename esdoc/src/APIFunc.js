/**
 * Created by priyanka on 25/4/16.
 */
/**
 * request() Executes the public API's request. With the Data and URL it calls for the sendAndFollow method.
 * @param  {String} method HTTP method
 * @param  {String} path The resource's path
 * @param {object} data Data to send along with the request
 * @param {String} accessToken  Auth token for authentication
 * @param  {String} headerChange Parameters that will be sent
 * @return {Promise}
 */
export function request(method, path, data, accessToken, headerChange = {} = () => {}) {
}

/**
 * sendAndFollow() executes the public API's request. With the params passed from request(), it hits the API to get a response.
 * It parses the object data with the help of parseRequest() and parseResponse() data.
 * @param  {String}     method    The HTTP method (GET, POST, PUT, DELETE)
 * @param  {String}     url       The resource's url
 * @param  {Object}     data      Data to send along with the request
 * @param  {String}  accessToken  Authentication token for authentication
 * @param  {String} headerChange Parameters that will be sent
 * @return {Promise}
 */
export function sendAndFollow(method, url, data, accessToken, headerChange) {
}

/**
 * parseRequest() parses the public API's request. It stringifies the object data.
 * @param  {object} data The original XMLHttpRequest
 * @return {String}  Stringify the original XMLHttpRequest
 */
export function parseRequest(data) {
}

/**
 * sendRequest() executes the public API's request and returns the response.
 * @param  {String}     method    The HTTP method (GET, POST, PUT, DELETE)
 * @param  {String}     url       The resource's url
 * @param  {String}     requestData      Data to send along with the request
 * @param  {String}  accessToken  Authentication token for authentication
 * @param  {String} headerChange Parameters that will be sent
 * @return {Promise}
 */
export function sendRequest(method, url, requestData, accessToken, headerChange) {
}


/**
 * parseResponse() is for parsing the response received from the request.
 * @param  {String}     responseText    The API raw response
 * @param  {XMLHttpRequest}     request       The original XMLHttpRequest
 * @return {Object({json, error})} Parses the public API's response and constructs error messages
 */
export function parseResponse(responseText, request) {}

