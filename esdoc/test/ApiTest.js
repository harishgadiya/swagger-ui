/**
 * Created by priyanka on 28/4/16.
 */

const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');
const fBird = require('../index');
const btoa = require('btoa');
const chaiHttp = require('chai-http');
const rewire = require("rewire");
const api = require('../src/api');
chai.use(chaiHttp);
chai.should();


/** @test {API} */
describe('API calls', function() {

    var xhr;
    beforeEach(function() {
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        this.xhr = sinon.useFakeXMLHttpRequest();
        var requ = this.requests = [];
        this.xhr.onCreate = function(xhr) {
            requ.push(xhr);
        };
        fBird.initialize({
            client_id: 'YOUR_CLIENT_ID',
            redirect_uri: 'http://localhost:8181'
        });
    });

    afterEach(function() {
        this.xhr.restore();
    });

    describe("Authentication", () => {
        /** @test {fBird.get /v1/authenticate} */

        it("should call get and return token", function(done) {

            var result;
            var token = {
                "code": "200",
                "message": "dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5"
            };

            var path = 'http://localhost:8181/v1/authenticate',
                loginData = 'userName:password';
            var mock = sinon.mock(api).expects("request")
                .withExactArgs('GET', path, loginData).returns(token);
            var expectedResult = {
                "code": "200",
                "message": "dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5"
            };
            result = fBird.get(path, loginData);
            mock.verify();
            done();
            expect(result).to.be.a("object");
            expect(result).to.be.not.a("number");
            expect(result).to.be.not.a("string");
            expect(result.code).to.equal(expectedResult.code);
            expect(result.message).to.equal(expectedResult.message);
        });

        it('should return the request with the promise', function() {
            var path = 'v1/authenticate',
                data = 'userName:password';
            var promise = fBird.get('GET', path, data, '', 'noChange');
            assert.isNotNull(promise.request);
            assert.instanceOf(promise.request, XMLHttpRequest);
        });

        it('should return the correct status if a request has an empty response', function() {
            var callback = sinon.spy();
            var data = 'userName:passWord',
                token = 'dXNlck5hbWU6cGFzc3dvcmQ=';

            fBird.get('v1/authenticate', data);
            var expectedResult = JSON.stringify({
                "code": "400",
                "message": "No authorization credentials found"
            });
            this.requests[0].respond(400, {
                    "Authorization": "Basic " + token
                },
                expectedResult);
            var result = this.requests[0].response;
            expect(this.requests.length).to.equal(1);
            callback.calledWith(expectedResult);
            expect(result.code).to.equal(expectedResult.code);
            expect(result.message).to.equal(expectedResult.message);
        });

        it('should make a GET against trip object', function(done) {
            fBird.get('v1/authenticate', 'userName:password').then(function(res) {
                assert.equal(res.code, 200);
                assert.equal(this.requests[0].method, 'GET');
                done();
            }.bind(this)).catch(function(err) {
                done(err);
            });
            this.requests[0].respond(200, {
                    'Authorization': 'Basic userName:password'
                },
                '{"code":"200","message":"dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5"}');
        });

        it('should trigger a promise catch on a 403 with bad JSON', function(done) {
            fBird.get('v1/authenticate', '').then(function(res) {
                assert(res, 200);
                assert.fail('dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5', res.message);
                //done(res);
            }.bind(this)).catch(function(err) {
                assert.ok(err.actual, 'Promise should not resolve');
                done(err);
                //assert.equal(err.status, 500, 'error.status is a 500');
            });
            this.requests[0].respond(403, {
                    'Authorization': 'Basic userName:password'
                },
                '{"code":"200","message":"dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5"}');
            done()
        });

        it('should trigger a promise catch on a 500 with error JSON', function(done) {
            fBird.get('v1/authenticate').then(function(res) {
                assert.fail('Promise should not resolve');
            }.bind(this)).catch(function(err) {
                assert.ok(err, 'Promise.catch is sent and error object');
                assert.equal(err.status, 500, 'error.status is a 500');
                assert.equal(err.message, 'server explosion');
            });
            this.requests[0].respond(500, {
                    'Content-Type': 'text/json'
                },
                '{"errors": [{"error_message": "server explosion"}]}');
            done();
        });

        it('should trigger a promise catch on a 404', function(done) {
            fBird.get('v1/authenticate').then(function(res) {
                assert.fail('Promise should not resolve');
            }.bind(this)).catch(function(err) {
                assert.ok(err, 'Promise.catch is sent and error object');
                assert.equal(err.status, 404, 'error.status is a 404');
                assert.equal(err.message, 'not found');
            });
            this.requests[0].respond(404, {
                    'Content-Type': 'text/json'
                },
                '{"errors": [{"error_message": "not found"}]}');
            done();
        });

        it('get basic authenticated token', function() {
            var path = 'v1/authenticate',
                data = 'userName:password';
            var callback = sinon.spy();
            var promise = api.request('GET', path, data, '', 'noChange');
            expect(this.requests.length).to.equal(1);
            assert.isNotNull(this.requests);
            this.requests[0].respond(200, {
                "Authorization": "Basic "
            }, data);
            assert.equal(promise.request.status, 200);
        });

        it('should return the correct status if a request has an empty response', function(done) {
            var path = 'v1/authenticate',
                data = 'userName:password';
            var promise = api.request('GET', path, data, '', 'noChange');
            this.requests[0].respond(200, {
                    "Authorization": "Basic "
                },
                data);
            assert.equal(promise.request.status, 200);
            // assert.equal(promise.request.message, 'HTTP Error: 500');
            done();
        });
    });

    describe("pricing", () => {

        var data = {
                "missedConnections": true,
                "passengerCounts": {
                    "adult": 1,
                    "child": 2,
                    "infantInLap": 0,
                    "infantInSeat": 0,
                    "senior": 0
                },
                "data": {
                    "key1": "val1",
                    "kye2": "val2"
                },
                "slices": [{
                    "duration": 0,
                    "segments": [{
                        "duration": 10,
                        "flight": {
                            "airlineCode": "AA",
                            "flightNumber": 124,
                            "date": {
                                "year": 2016,
                                "month": 4,
                                "day": 4
                            }
                        },
                        "cabin": "cabin",
                        "bookingCode": "bookingCode",
                        "bookingCodeCount": "bookingCodeCount",
                        "data": {
                            "key1": "val1",
                            "kye2": "val2"
                        },
                        "leg": [{
                            "aircraft": "aircraft",
                            "arrival": "2016-04-04",
                            "departure": "2016-04-04",
                            "origin": "ORD",
                            "destination": "LAX",
                            "operatingDisclosure": "operatingDisclosure",
                            "changePlane": "changePlane",
                            "data": {
                                "key1": "val1",
                                "kye2": "val2"
                            }
                        }]
                    }]
                }]
            },

            token = 'dXNlck5hbWU6cGFzc3dvcmQ=';
        var expectedResult = JSON.stringify({
            "code": "200",
            "data": {
                "id": "41008",
                "priceExpiration": "2016-05-04T17:29Z",
                "tripId": "41016",
                "data": {
                    "key1": "val1",
                    "kye2": "val2"
                },
                "regularPrice": 19.0
            }
        });

        /** @test {fBird.post /v1/pricing} */

        it('should call pricing API post method', function(done) {

            var data = dataObjects.data({
                "key1": "val1",
                "kye2": "val2"
            });
            var result;
            var pricingToken = 'YWNjZXNzVG9rZW46ZFhObGNrNWhiV1U2V0U1U01HYzFjRE4zTlZZd1ZteHBMMVV2YVhKelFscDZSM1ZKUFRveE5EWXdNakE1T1RNMk56STU=';
            var path = 'http://localhost:8181/v1/pricing';

            var pricingResult = {
                "code": "200",
                "data": {
                    "id": "49256",
                    "priceExpiration": "2016-04-22T17:21Z",
                    "tripId": "28904",
                    "data": {
                        "key1": "val1",
                        "kye2": "val2"
                    },
                    "regularPrice": 19.0
                }
            };
            var expectedResult = {
                "code": "200",
                "data": {
                    "id": "49256",
                    "priceExpiration": "2016-04-22T17:21Z",
                    "tripId": "28904",
                    "data": {
                        "key1": "val1",
                        "kye2": "val2"
                    },
                    "regularPrice": 19.0
                }
            };
            /* =------------generating trip objects =----------------*/

            var date = dataObjects.date(2016, 4, 4);
            var flight = dataObjects.flight('AA', 124, date);
            var passengerCounts = dataObjects.passengerCounts(1, 2, 0, 0, 0);

            var leg = dataObjects.leg('aircraft', '2016-04-04', '2016-04-04', 'ORD', 'LAX',
                'operatingDisclosure', 'changePlane', data);
            var segment = dataObjects.segment(10, flight, 'cabin', 'bookingCode', 'bookingCodeCount', data, [leg]);
            var slice = dataObjects.slices(10, [segment]);
            var trip = dataObjects.trip(true, passengerCounts, data, [slice]);
            var mock = sinon.mock(api).expects("request")
                .withExactArgs('POST', path, trip, pricingToken, 'change').returns(pricingResult);
            result = fBird.post(path, trip, pricingToken, 'change');
            mock.verify();
            done();
            expect(result).to.be.a("object");
            expect(result).to.be.not.a("number");
            expect(result).to.be.not.a("string");
            expect(result.code).to.equal(expectedResult.code);
            expect(result.data.tripId).to.equal(expectedResult.data.tripId);
        });


        it('should return the request with the promise', function() {
            var path = 'v1/pricing',
                data = 'userName:password';
            var promise = fBird.get('GET', path, data, '', 'noChange');
            assert.isNotNull(promise.request);
            assert.instanceOf(promise.request, XMLHttpRequest);

        });

        it('should return the correct status if a request has an empty response', function(done) {
            var callback = sinon.spy();

            fBird.post('v1/pricing', data);

            this.requests[0].respond(400, {
                    "Authorization": "Basic " + token
                },
                expectedResult);
            var result = this.requests[0].response;
            expect(this.requests.length).to.equal(1);
            callback.calledWith(expectedResult);
            expect(result.code).to.equal(expectedResult.code);
            expect(result.message).to.equal(expectedResult.message);
            done();
        });

        it('should make a POST against pricing object', function(done) {
            fBird.post('v1/pricing', data).then(function(res) {
                assert.equal(res.code, 200);
                assert.equal(this.requests[0].method, 'POST');
                done();
            }.bind(this)).catch(function(err) {
                done(err);
            });
            this.requests[0].respond(200, {
                    'Authorization': 'Basic ' + token
                },
                expectedResult);
        });

        it('should trigger a promise catch on a 403 with bad JSON', function() {
            fBird.post('v1/pricing', '').then(function(res) {
                assert(res, 200);
                //assert.fail('dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5', res.message);
            }.bind(this)).catch(function(err) {
                assert.ok(err.actual, 'Promise should not resolve');
                //assert.equal(err.status, 500, 'error.status is a 500');
            });
            this.requests[0].respond(403, {
                    'Authorization': 'Basic userName:password'
                },
                '{"code":"200","message":"dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5"}');
        });

        it('should trigger a promise catch on a 500 with error JSON', function(done) {
            fBird.post('v1/pricing').then(function(res) {
                assert.fail('Promise should not resolve');
            }.bind(this)).catch(function(err) {
                assert.ok(err, 'Promise.catch is sent and error object');
                assert.equal(err.status, 500, 'error.status is a 500');
                assert.equal(err.message, 'server explosion');
            });
            this.requests[0].respond(500, {
                    'Content-Type': 'text/json'
                },
                '{"errors": [{"error_message": "server explosion"}]}'
            );
            done();
        });

        it('should trigger a promise catch on a 404', function(done) {
            fBird.post('v1/pricing').then(function(res) {
                assert.fail('Promise should not resolve');
            }.bind(this)).catch(function(err) {
                assert.ok(err, 'Promise.catch is sent and error object');
                assert.equal(err.status, 404, 'error.status is a 404');
                assert.equal(err.message, 'not found');
            });
            this.requests[0].respond(404, {
                    'Content-Type': 'text/json'
                },
                '{"errors": [{"error_message": "not found"}]}'
            );
            done();
        });

        it('should return the request with the promise in pricing api', function(done) {
            var path = 'v1/pricing',
                pricingToken = 'YWNjZXNzVG9rZW46ZFhObGNrNWhiV1U2V0U1U01HYzFjRE4zTlZZd1ZteHBMMVV2YVhKelFscDZSM1ZKUFRveE5EWXdNakE1T1RNMk56STU=',
                invalidToken = 'YWNjZXNzVG9rZW46ZFhObGNrNWhiV1U2V0U1U01HYzFjRE4zTlZZd1ZteHBMMVV2YVhKelFscDZSM1ZKUFRveE5EWXdNakE1T1RNMk56';
            /* =------------generating trip objects =----------------*/
            var pricingResult = {
                "code": "200",
                "data": {
                    "id": "49256",
                    "priceExpiration": "2016-04-22T17:21Z",
                    "tripId": "28904",
                    "data": {
                        "key1": "val1",
                        "kye2": "val2"
                    },
                    "regularPrice": 19.0
                }
            };
            var date = dataObjects.date(2016, 4, 4);
            var flight = dataObjects.flight('AA', 124, date);
            var passengerCounts = dataObjects.passengerCounts(1, 2, 0, 0, 0);
            var data = dataObjects.data({
                "key1": "val1",
                "kye2": "val2"
            });
            var leg = dataObjects.leg('aircraft', '2016-04-04', '2016-04-04', 'ORD', 'LAX',
                'operatingDisclosure', 'changePlane', data);
            var segment = dataObjects.segment(10, flight, 'cabin', 'bookingCode', 'bookingCodeCount', data, [leg]);
            var slice = dataObjects.slices(10, [segment]);
            var trip = dataObjects.trip(true, passengerCounts, data, [slice]);


            // var promise = api.request('POST', path, trip, pricingToken, 'change');
            var invalidTokenRequest = api.request('POST', path, trip, invalidToken, 'change');
            assert.isNotNull(invalidTokenRequest.request);
            assert.instanceOf(invalidTokenRequest.request, XMLHttpRequest);
            expect(pricingResult).to.be.a("object");
            expect(pricingResult).to.be.not.a("number");
            expect(pricingResult).to.be.not.a("string");
            done();
        });

        it('should return the correct status if a request has an empty response', function(done) {
            var path = 'v1/pricing'
            var promise = api.request('POST', path, data, '', 'noChange');
            this.requests[0].respond(200, {
                    "Authorization": "Basic "
                },
                JSON.stringify(data));
            assert.equal(promise.request.status, 200);
            // assert.equal(promise.request.message, 'HTTP Error: 500');
            done();
        });
    });

    describe("Purchase", () => {

        var data = {
            "priceRequestId": "24776",
            "clientNonce": "string",
            "priceTier": "GOLD",
            "trip": {
                "id": "78000",
                "personInfo": [{
                    "gender": "male",
                    "firstName": "string",
                    "lastName": "string",
                    "middleName": "string",
                    "dateOfBirth": {
                        "year": 1990,
                        "month": 1,
                        "day": 1
                    },
                    "phone": "string",
                    "email": "string",
                    "isDeciderToPay": true,
                    "isPayer": true,
                    "isPassenger": true,
                    "isBookingPerson": true
                }]
            },
            "pciTransactionId": "pciTransactionId",
            "data": {
                "key1": "val1",
                "kye2": "val2"
            }
        };

        var token = 'dXNlck5hbWU6cGFzc3dvcmQ=';

        var expectedResult = JSON.stringify({
            "purchaseId": "32880",
            "purchaseTotal": 19.0,
            "priceRequestId": "24776",
            "encClientNonce": "SHA256Base64url",
            "trip": {
                "id": "78000",
                "data": {
                    "key1": "val1",
                    "kye2": "val2"
                }
            },
            "pciTransactionId": "pciTransactionId",
            "data": {
                "key1": "val1",
                "kye2": "val2"
            }
        });

        /** @test {fBird.post /v1/purchase} */

        it('should call purchase API post method', function(done) {

            var data = dataObjects.data({
                "key1": "val1",
                "kye2": "val2"
            });
            var result;
            var pricingToken = 'YWNjZXNzVG9rZW46ZFhObGNrNWhiV1U2V0U1U01HYzFjRE4zTlZZd1ZteHBMMVV2YVhKelFscDZSM1ZKUFRveE5EWXdNakE1T1RNMk56STU=';
            var path = 'http://localhost:8181/v1/purchase';
            var purchaseResult = {
                "code": "200",
                "data": {
                    "id": "49256",
                    "priceExpiration": "2016-04-22T17:21Z",
                    "tripId": "28904",
                    "data": {
                        "key1": "val1",
                        "kye2": "val2"
                    },
                    "regularPrice": 19.0
                }
            };
            var expectedResult = {
                "code": "200",
                "data": {
                    "id": "49256",
                    "priceExpiration": "2016-04-22T17:21Z",
                    "tripId": "28904",
                    "data": {
                        "key1": "val1",
                        "kye2": "val2"
                    },
                    "regularPrice": 19.0
                }
            };
            /* =------------generating purchase objects =----------------*/

            var dateOfBirth = dataObjects.dateOfBirth(1990, 1, 1);
            var personInfo = dataObjects.personInfo('male', 'string', 'string', 'string', dateOfBirth, 'string', 'string', true, true, true, true);
            var tripdata = dataObjects.tripData(result.data.tripId, [personInfo]);
            var purchase = dataObjects.purchaseData(result.data.id, 'string', 'GOLD', tripdata, 'pciTransactionId', data);

            var mock = sinon.mock(api).expects("request")
                .withExactArgs('POST', path, purchase, pricingToken, 'change').returns(purchaseResult);
            result = fBird.post(path, purchase, pricingToken, 'change');
            mock.verify();
            done();
            expect(result).to.be.a("object");
            expect(result).to.be.not.a("number");
            expect(result).to.be.not.a("string");
            expect(result.code).to.equal(expectedResult.code);
            expect(result.data.tripId).to.equal(expectedResult.data.tripId);
        });


        it('should return the request with the promise', function() {
            var path = 'v1/purchase',
                data = 'userName:password';
            var promise = fBird.get('GET', path, data, '', 'noChange');
            assert.isNotNull(promise.request);
            assert.instanceOf(promise.request, XMLHttpRequest);
        });

        it('should return the correct status if a request has an empty response', function() {
            var callback = sinon.spy();

            fBird.post('v1/purchase', data);

            this.requests[0].respond(400, {
                    "Authorization": "Basic " + token
                },
                expectedResult);
            var result = this.requests[0].response;
            expect(this.requests.length).to.equal(1);
            callback.calledWith(expectedResult);
            expect(result.code).to.equal(expectedResult.code);
            expect(result.message).to.equal(expectedResult.message);
        });

        it('should make a POST against purchase object', function(done) {

            fBird.post('v1/purchase', data).then(function(res) {
                assert.equal(this.requests[0].method, 'POST');
                done();
            }.bind(this)).catch(function(err) {
                done(err);
            });
            this.requests[0].respond(200, {
                    'Authorization': 'Basic ' + token
                },
                expectedResult);
        });

        it('should trigger a promise catch on a 403 with bad JSON', function(done) {
            fBird.post('v1/purchase', '').then(function(res) {
                assert(res, 200);
                //assert.fail('dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5', res.message);
                //done(res);
            }.bind(this)).catch(function(err) {
                assert.ok(err.actual, 'Promise should not resolve');
                done(err);
                //assert.equal(err.status, 500, 'error.status is a 500');
            });
            this.requests[0].respond(403, {
                    'Authorization': 'Basic userName:password'
                },
                '{"code":"200","message":"dXNlck5hbWU6WE5SMGc1cDN3NVYwVmxpL1UvaXJzQlp6R3VJPToxNDYwMjA5OTM2NzI5"}');
            done()
        });

        it('should trigger a promise catch on a 500 with error JSON', function(done) {
            fBird.post('v1/purchase').then(function(res) {
                assert.fail('Promise should not resolve');
            }.bind(this)).catch(function(err) {
                assert.ok(err, 'Promise.catch is sent and error object');
                assert.equal(err.status, 500, 'error.status is a 500');
                assert.equal(err.message, 'server explosion');
            });
            this.requests[0].respond(500, {
                    'Content-Type': 'text/json'
                },
                '{"errors": [{"error_message": "server explosion"}]}'
            );
            done();
        });

        it('should trigger a promise catch on a 404', function(done) {
            fBird.post('v1/purchase').then(function(res) {
                assert.fail('Promise should not resolve');
            }.bind(this)).catch(function(err) {
                assert.ok(err, 'Promise.catch is sent and error object');
                assert.equal(err.status, 404, 'error.status is a 404');
                assert.equal(err.message, 'not found');
            });
            this.requests[0].respond(404, {
                    'Content-Type': 'text/json'
                },
                '{"errors": [{"error_message": "not found"}]}'
            );
            done();
        });
    });
});
