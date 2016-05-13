/**
 * Created by priyanka on 21/4/16.
 */
import DateOfBirth from './DOBClass.js';
import Date from './DateClass.js';
import Flight from './FlightClass.js';
import Leg from './LegClass.js';
import PassengerCount from './PassengerCountClass.js';
import PersonDetails from './PersonDetailsClass.js';
import PurchaseData from './PurchaseDataClass.js';
import Segment from './SegmentClass.js';
import Slice from './SliceClass.js';
import Trip from './TripClass.js';
import TripData from './TripDataClass.js';

/**
 * dataObjects is a global object, which returns a new instance of each class.
 * @typedef {Object} dataObjects
 */

/**
 * dataObjects.flight returns a new instance of Flight class.
 * @typedef {Object} dataObjects.flight
 * @property {number} airlineCode - Airline code of the flight
 * @property {number} flightNumber - Flight number of the flight
 * @property {string} date - Departure date (format : YYYY-MM-DD)
 */

export function flight(airlineCode, flightNumber, date){
  return (new Flight(airlineCode, flightNumber, date))
}

/**
 * dataObjects.passengerCounts returns a new instance of PassengerCount class.
 * @typedef {Object} dataObjects.passengerCounts
 * @property {number} adult - Count of adult passengers
 * @property {number} child - Count of child passengers
 * @property {number} infantInLap - Count of infant in lap passengers
 * @property {number} infantInSeat - Count of infant in seat passengers
 * @property {number} senior - Count of senior passengers
 */

export function passengerCounts(adult, child, infantInLap, infantInSeat, senior){
  return (new PassengerCount(adult, child, infantInLap, infantInSeat, senior))
}

/**@typedef {Object} dataObjects.data
 */

export function data(){
  return data
}

/**
 * dataObjects.date returns a new instance of Date class.
 * @typedef {Object} dataObjects.date
 * @property {string} year - Year of booking
 * @property {string} month - Month of booking
 * @property {string} day - Date of booking
 */

export function date(year, month, day){
  return (new Date(year, month, day));
}

/**
 * dataObjects.leg returns a new instance of Leg class.
 * @typedef {Object} dataObjects.leg
 * @property {string} aircraft - Aircraft is flying between an origin and destination.
 * @property {string} arrival - Flight arrival date in Jodatime format
 * @property {string} departure - Flight departure date in Jodatime format
 * @property {string} origin - Source origin of the flight
 * @property {string} destination - Flight Destination
 * @property {string} operatingDisclosure - Department of Transportation disclosure information on the actual operator of a flight in a code share.
 * @property {boolean} changePlane - Whether the passenger(s) have to change planes following this leg. Only applies to the next leg.
 * @property {string} data - [OPTIONAL] any client specific key-value pair specific to leg
 */

export function leg(aircraft, arrival, departure, origin, destination, operatingDisclosure, changePlane, data){
  return (new Leg(aircraft, arrival, departure, origin, destination, operatingDisclosure, changePlane, data));
}

/**
 * dataObjects.segment returns a new instance of Segment class.
 * @typedef {Object} dataObjects.segment
 * @property {number} duration - Flight duration
 * @property {object} flight - Flight object having flight details
 * @property {string} cabin - Booked Cabin in the Flight
 * @property {string} bookingCode - The booking code or class for this segment.
 * @property {number} bookingCodeCount - The number of seats available in this booking code on this segment.
 * @property {string} data - [OPTIONAL] any client specific key-value pair specific to segment
 * @property {object[]} leg - Leg object comprising of the details about the hop taken by a flight.Segment can have multiple legs
 */

export function segment(duration, flight, cabin, bookingCode, bookingCodeCount, data, leg){
  return (new Segment(duration, flight, cabin, bookingCode, bookingCodeCount, data, leg));
}

/**
 * dataObjects.slice returns a new instance of Slice class.
 * @typedef {Object} dataObjects.slice
 * @property {number} duration - Flight duration (to reach from source to the destination)
 * @property {object[]} segment - Segment object having flight data. Slice can have multiple segments
 */

export function slice(duration, segment){
  return (new Slice(duration, segment));
}

/**
 * dataObjects.trip returns a new instance of Trip class.
 * @typedef {Object} dataObjects.trip
 * @property {boolean} missedConnections - -
 * @property {object} passengerCounts - Passenger count object having the total count of travelling passengers.
 * @property {string} data - [OPTIONAL] any client specific key-value pair specific to trip.
 * @property {object[]} slices - Slice object having trip info. Trip can have multiple slices.
 */
export function trip(missedConnections, passengerCounts, data, slices){
  return (new Trip(missedConnections, passengerCounts, data, slices));
}

/**
 * dataObjects.dateOfBirth returns a new instance of DateOfBirth class.
 * @typedef {Object} dataObjects.dateOfBirth
 * @property {string} year - Birth year of the passenger
 * @property {string} month - Birth month of the passenger
 * @property {string} day - Birth date of the passenger
 */
export function dateOfBirth(year, month, day){
  return (new DateOfBirth(year, month, day));
}

/**
 * dataObjects.personInfo returns a new instance of PersonInfo class.
 * @typedef {Object} dataObjects.personInfo
 * @property {string} gender - Gender of the passenger
 * @property {string} firstName - First name of the passenger
 * @property {string} lastName - Last name of the passenger
 * @property {string} middleName - Middle name of the passenger
 * @property {object} dateOfBirth - Date Of Birth of the passenger
 * @property {string} phone - Phone number of the passenger
 * @property {string} email - Email of the passenger
 * @property {boolean} isDeciderToPay - Is he the decider to pay?
 * @property {boolean} isPayer - Is he the Payer?
 * @property {boolean} isPassenger - Is he the passenger himself?
 * @property {boolean} isBookingPerson - Is he the booking person?
 */
export function personInfo(gender, firstName, lastName, middleName, dateOfBirth,
                           phone, email, isDeciderToPay, isPayer, isPassenger, isBookingPerson){
  return (new PersonDetails(gender, firstName, lastName, middleName, dateOfBirth,
      phone, email, isDeciderToPay, isPayer, isPassenger, isBookingPerson));
}

/**
 * dataObjects.tripData returns a new instance of TripData class.
 * @typedef {Object} dataObjects.tripData
 * @property {string} id - Trip ID received from the Pricing API
 * @property {object} personInfo - Person details received from PersonDetails class

 */
export function tripData(id, personInfo){
  return (new TripData(id, personInfo));
}


/**
 * dataObjects.purchaseData returns a new instance of PurchaseData class.
 * @typedef {Object} dataObjects.purchaseData
 * @property {number} priceRequestId - This is the pricing ID , received from the pricing API
 * @property {string} clientNonce - ClientNonce can be GOLD, PREMIUM or PLATINUM
 * @property {string} priceTier - PriceTier
 * @property {object} tripData - This is received from the TripData Class
 * @property {string} pciTransactionId - Payment Transaction ID
 * @property {string} data - Data having payment related details of the purchased transaction
 */
export function purchaseData(priceRequestId, clientNonce, priceTier,tripData, pciTransactionId, data){
  return (new PurchaseData(priceRequestId, clientNonce, priceTier,tripData, pciTransactionId, data));
}






