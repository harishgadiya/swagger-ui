/**
 * Created by priyanka on 25/4/16.
 */
var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var word = require('../../src/objects');
chai.should();

describe('JS Objects', function() {

    /** @test {Flight} */

    it('Flight object', ()=>  {
        var flightObj = dataObjects.flight('AA', "d", "2016-01-26");
        var flightTestObj = {airlineCode: "AA", flightNumber: "d", date: "2016-01-26"};
        var flightFalseObj = {airlineCode: undefined, flightNumber: "e", date: "2016-01-26"};

        expect(flightObj).to.be.a('Object');

        expect(flightObj).to.be.not.a('string');
        expect(JSON.stringify(flightObj)).to.be.a('string');

        expect(flightObj).to.be.not.a('null');
        expect(flightObj).to.be.not.a('undefined');

        expect(flightObj.airlineCode).to.be.not.a('undefined');
        expect(flightFalseObj.airlineCode).to.be.a('undefined');

        assert.sameMembers([flightTestObj.flightNumber], [flightObj.flightNumber], 'same value');
        expect(flightTestObj.flightNumber).to.not.equal(flightFalseObj.flightNumber);

        assert.sameMembers([JSON.stringify(flightTestObj)], [JSON.stringify(flightObj)], 'same members');
        expect(JSON.stringify(flightFalseObj)).to.not.equal(JSON.stringify(flightObj));
    });

    /** @test {PassengerCount} */

    it('PassengerCount object', ()=>  {
        var passCountObj = dataObjects.passengerCounts(1,2,1,0,0);

        var passCountTestObj = { adult:1, child:2, infantInLap:1, infantInSeat:0, senior:0 };
        var passCountFalseObj = { adult:undefined, child:1, infantInLap:1, infantInSeat:0, senior:0 };

        expect(passCountObj).to.be.a('Object');

        expect(passCountObj).to.be.not.a('string');
        expect(JSON.stringify(passCountObj)).to.be.a('string');

        expect(passCountObj).to.be.not.a('null');
        expect(passCountObj).to.be.not.a('undefined');

        expect(passCountObj.adult).to.be.not.a('undefined');
        expect(passCountFalseObj.adult).to.be.a('undefined');

        assert.sameMembers([passCountTestObj.child], [passCountObj.child], 'same value');
        expect(passCountTestObj.child).to.not.equal(passCountFalseObj.child);

        assert.sameMembers([JSON.stringify(passCountTestObj)], [JSON.stringify(passCountObj)], 'same members');
        expect(JSON.stringify(passCountFalseObj)).to.not.equal(JSON.stringify(passCountObj));
    });

    /** @test {Date} */

    it('Date object', ()=>  {
        var dateObj = dataObjects.date(2016,1,28);

        expect(dateObj).to.be.a('Object');
        expect(dateObj).to.be.not.a('number');
        expect(dateObj).to.be.not.a('string');
    });

    /** @test {Leg} */

    it('Leg object', ()=>  {
        var dataObj = {
            key1 : 'key1',
            key2  : 'kek2'
        };

        var legObj = dataObjects.leg('aircraft', '2016-04-04','2016-04-04', 'ORD', 'LAX',
            'operatingDisclosure', 'changePlane', dataObj);

        var legTestObj = { aircraft: "aircraft", arrival: "2016-04-04", departure: "2016-04-04",
            origin: "ORD" , destination: "LAX", operatingDisclosure: "operatingDisclosure" ,
            changePlane: "changePlane", data: dataObj};
        var legFalseObj = { aircraft: undefined, arrival: "2016-04-10", departure: "2016-04-04",
            origin: "ORD" , destination: null, operatingDisclosure: " " ,
            changePlane: "changePlane", data: "data"};

        expect(legObj).to.be.a('Object');

        expect(legObj).to.be.not.a('string');
        expect(JSON.stringify(legObj)).to.be.a('string');

        expect(legObj).to.be.not.a('null');
        expect(legObj).to.be.not.a('undefined');

        expect(legObj.aircraft).to.be.not.a('undefined');
        expect(legFalseObj.aircraft).to.be.a('undefined');

        assert.sameMembers([legTestObj.arrival], [legObj.arrival], 'same value');
        expect(legTestObj.arrival).to.not.equal(legFalseObj.arrival);

        assert.sameMembers([JSON.stringify(legTestObj)], [JSON.stringify(legObj)], 'same members');
        expect(JSON.stringify(legFalseObj)).to.not.equal(JSON.stringify(legObj));
    });

    /** @test {Segment} */

    it('Segment object', ()=>  {
        var dataObj = {
            key1 : 'key1',
            key2 : 'kek2'
        };

        var legObj = dataObjects.leg('aircraft', '2016-04-04','2016-04-04', 'ORD', 'LAX',
            'operatingDisclosure', 'changePlane', dataObj);

        var segmentObj = dataObjects.segment(10, 'flight', 'cabin', 'bookingCode', 'bookingCodeCount', dataObj, legObj);

        var segmentTestObj = { duration: 10, flight: 'flight', cabin: 'cabin',
            bookingCode: 'bookingCode' , bookingCodeCount: 'bookingCodeCount', data: dataObj ,
            leg: legObj};

        var segmentFalseObj = { duration: undefined, flight: 'airlines', cabin: 'cabin',
            bookingCode: 'bookingCode' , bookingCodeCount: 'bookingCodeCount', data: 'data' ,
            leg: "legObj"};

        expect(segmentObj).to.be.a('Object');

        expect(segmentObj).to.be.not.a('string');
        expect(JSON.stringify(segmentObj)).to.be.a('string');

        expect(segmentObj).to.be.not.a('null');
        expect(segmentObj).to.be.not.a('undefined');

        expect(segmentObj.duration).to.be.not.a('undefined');
        expect(segmentFalseObj.duration).to.be.a('undefined');

        assert.sameMembers([segmentTestObj.leg], [segmentObj.leg], 'same value');
        expect(segmentTestObj.leg).to.not.equal(segmentFalseObj.leg);

        assert.sameMembers([JSON.stringify(segmentTestObj)], [JSON.stringify(segmentObj)], 'same members');
        expect(JSON.stringify(segmentFalseObj)).to.not.equal(JSON.stringify(segmentObj));
    });

    /** @test {Slice} */

    it('Slice object', ()=>  {
        var dataObj = {
            key1 : 'key1',
            key2 : 'kek2'
        };

        var legObj = dataObjects.leg('aircraft', '2016-04-04','2016-04-04', 'ORD', 'LAX',
            'operatingDisclosure', 'changePlane', dataObj);

        var segmentObj = dataObjects.segment(10, 'flight', 'cabin', 'bookingCode', 'bookingCodeCount', dataObj , legObj);

        var sliceObj = dataObjects.slices(10,segmentObj);

        var sliceTestObj = {duration : 10,segments : segmentObj};
        var sliceFalseObj = {duration : undefined,segments : 'segmentObj'};

        expect(sliceObj).to.be.a('Object');

        expect(sliceObj).to.be.not.a('string');
        expect(JSON.stringify(sliceObj)).to.be.a('string');

        expect(sliceObj).to.be.not.a('null');
        expect(sliceObj).to.be.not.a('undefined');

        expect(sliceObj.duration).to.be.not.a('undefined');
        expect(sliceFalseObj.duration).to.be.a('undefined');

        assert.sameMembers([sliceTestObj.segments], [sliceObj.segments], 'same value');
        expect(sliceTestObj.segments).to.not.equal(sliceFalseObj.segments);

        assert.sameMembers([JSON.stringify(sliceTestObj)], [JSON.stringify(sliceObj)], 'same members');
        expect(JSON.stringify(sliceFalseObj)).to.not.equal(JSON.stringify(sliceObj));
    });

    /** @test {Trip} */

    it('Trip object', ()=> {
        var dataObj = {
            key1 : 'key1',
            key2 : 'kek2'
        };

        var legObj = dataObjects.leg('aircraft', '2016-04-04','2016-04-04', 'ORD', 'LAX',
            'operatingDisclosure', 'changePlane', dataObj);

        var segmentObj = dataObjects.segment(10, 'flight', 'cabin', 'bookingCode', 'bookingCodeCount', dataObj , legObj);

        var sliceObj = dataObjects.slices(10,segmentObj);

        var tripObj = dataObjects.trip(true,'passengerCounts',dataObj ,sliceObj);

        var tripTestObj = {missedConnections : true,passengerCounts : 'passengerCounts', data : dataObj , slices : sliceObj};
        var tripFalseObj = {missedConnections : undefined,passengerCounts : 'passengerCounts', data : 'data',slices : 'sliceObj'};

        expect(tripObj).to.be.a('Object');

        expect(tripObj).to.be.not.a('string');
        expect(JSON.stringify(tripObj)).to.be.a('string');

        expect(tripObj).to.be.not.a('null');
        expect(tripObj).to.be.not.a('undefined');

        expect(tripObj.missedConnections).to.be.not.a('undefined');
        expect(tripFalseObj.missedConnections).to.be.a('undefined');

        assert.sameMembers([tripTestObj.slices], [tripObj.slices], 'same value');
        expect(tripTestObj.slices).to.not.equal(tripFalseObj.slices);

        assert.sameMembers([JSON.stringify(tripTestObj)], [JSON.stringify(tripObj)], 'same members');
        expect(JSON.stringify(tripFalseObj)).to.not.equal(JSON.stringify(tripObj));
    });

    /** @test {DateOfBirth} */

    it('DateOfBirth object', ()=> {
        var DOBObj = dataObjects.dateOfBirth(2016,1,28);

        expect(DOBObj).to.be.a('Object');
        expect(DOBObj).to.be.not.a('number');
        expect(DOBObj).to.be.not.a('string');
    });

    /** @test {PersonDetails} */

    it('PersonDetails object', ()=>  {
        var DOBObj = dataObjects.dateOfBirth(2016,1,28);

        var personInfoObj = dataObjects.personInfo('male','string','string','string',DOBObj,'string','string',true,true,true,true);

        var personInfoTestObj = {gender : 'male', firstName : 'string', lastName : 'string' , middleName : 'string' , dateOfBirth : DOBObj,
            phone : 'string', email : 'string', isDeciderToPay : true, isPayer: true , isPassenger : true, isBookingPerson : true};
        var personInfoFalseObj = {gender : 'male', firstName : undefined, lastName : 'string' , middleName : 'string' , dateOfBirth : 'DOBObj',
            phone : 'string', email : 'string', isDeciderToPay : true, isPayer: true , isPassenger : true, isBookingPerson : false};

        expect(personInfoObj).to.be.a('Object');

        expect(personInfoObj).to.be.not.a('string');
        expect(JSON.stringify(personInfoObj)).to.be.a('string');

        expect(personInfoObj).to.be.not.a('null');
        expect(personInfoObj).to.be.not.a('undefined');

        expect(personInfoObj.firstName).to.be.not.a('undefined');
        expect(personInfoFalseObj.firstName).to.be.a('undefined');

        assert.sameMembers([personInfoTestObj.dateOfBirth], [personInfoObj.dateOfBirth], 'same value');
        expect(personInfoTestObj.dateOfBirth).to.not.equal(personInfoFalseObj.dateOfBirth);

        assert.sameMembers([JSON.stringify(personInfoTestObj)], [JSON.stringify(personInfoObj)], 'same members');
        expect(JSON.stringify(personInfoFalseObj)).to.not.equal(JSON.stringify(personInfoObj));
    });

    /** @test {TripData} */

    it('TripData object', ()=>  {
        var DOBObj = dataObjects.dateOfBirth(2016,1,28);

        var personInfoObj = dataObjects.personInfo('male','string','string','string',DOBObj,'string','string',true,true,true,true);

        var tripDataObj = dataObjects.tripData(4565, personInfoObj)

        var tripDataTestObj = {id : 4565, personInfo : personInfoObj};
        var tripDataFalseObj = {id : undefined, personInfo : 'personInfoObj'};

        expect(tripDataObj).to.be.a('Object');

        expect(tripDataObj).to.be.not.a('string');
        expect(JSON.stringify(tripDataObj)).to.be.a('string');

        expect(tripDataObj).to.be.not.a('null');
        expect(tripDataObj).to.be.not.a('undefined');

        expect(tripDataObj.id).to.be.not.a('undefined');
        expect(tripDataFalseObj.id).to.be.a('undefined');

        assert.sameMembers([tripDataTestObj.personInfo], [tripDataObj.personInfo], 'same value');
        expect(tripDataTestObj.personInfo).to.not.equal(tripDataFalseObj.personInfo);

        assert.sameMembers([JSON.stringify(tripDataTestObj)], [JSON.stringify(tripDataObj)], 'same members');
        expect(JSON.stringify(tripDataFalseObj)).to.not.equal(JSON.stringify(tripDataObj));
    });

    /** @test {PurchaseData} */

    it('PurchaseData object', ()=>  {
        var dataObj = {
            key1 : 'key1',
            key2 : 'kek2'
        };

        var DOBObj = dataObjects.dateOfBirth(2016,1,28);

        var personInfoObj = dataObjects.personInfo('male','string','string','string',DOBObj,'string','string',true,true,true,true);

        var tripDataObj = dataObjects.tripData(4565, personInfoObj)

        var purchaseDataObj = dataObjects.purchaseData(6789,'string','GOLD',tripDataObj,'pciTransactionId',dataObj);
        var purchaseDataTestObj = { priceRequestId:6789 , clientNonce:'string' , priceTier:'GOLD' ,trip: tripDataObj, pciTransactionId : 'pciTransactionId', data: dataObj};
        var purchaseDataFalseObj = { priceRequestId:undefined , clientNonce:'string' , priceTier:'GOLD' ,trip: 'tripDataObj', pciTransactionId : 'pciTransactionId', data: dataObj};

        expect(purchaseDataObj).to.be.a('Object');

        expect(purchaseDataObj).to.be.not.a('string');
        expect(JSON.stringify(purchaseDataObj)).to.be.a('string');

        expect(purchaseDataObj).to.be.not.a('null');
        expect(purchaseDataObj).to.be.not.a('undefined');

        expect(purchaseDataObj.priceRequestId).to.be.not.a('undefined');
        expect(purchaseDataFalseObj.priceRequestId).to.be.a('undefined');

        assert.sameMembers([purchaseDataTestObj.trip], [purchaseDataObj.trip], 'same value');
        expect(purchaseDataTestObj.trip).to.not.equal(purchaseDataFalseObj.trip);

        assert.sameMembers([JSON.stringify(purchaseDataTestObj)], [JSON.stringify(purchaseDataObj)], 'same members');
        expect(JSON.stringify(purchaseDataFalseObj)).to.not.equal(JSON.stringify(purchaseDataObj));
    })
});
