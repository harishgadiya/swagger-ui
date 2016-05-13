/**
 * Created by priyanka on 18/4/16.
 */
/**
 * A leg is the smallest unit of travel, in the case of a flight a takeoff immediately followed by a landing at two set points on a particular carrier with a particular flight number.
 */
export default class Leg {
    /**
     * @param {string} aircraft - Aircraft is flying between an origin and destination.
     * @param {string} arrival - Flight arrival date in Jodatime format
     * @param {string} departure - Flight departure date in Jodatime format
     * @param {string} origin - Source origin of the flight
     * @param {string} destination - Flight Destination
     * @param {string} operatingDisclosure - Department of Transportation disclosure information on the actual operator of a flight in a code share.
     * @param {boolean} changePlane - Whether the passenger(s) have to change planes following this leg. Only applies to the next leg.
     * @param {string} data - [OPTIONAL] any client specific key-value pair specific to leg
     **/
    constructor(aircraft, arrival, departure, origin, destination, operatingDisclosure, changePlane, data) {
        this._aircraft = aircraft;
        this._arrival = arrival;
        this._departure = departure;
        this._origin = origin;
        this._destination = destination;
        this._operatingDisclosure = operatingDisclosure;
        this._changePlane = changePlane;
        this._data = data;
    }
}