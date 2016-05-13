/**
 * Created by priyanka on 18/4/16.
 */
/**
 * Trip object
 */
import Slice from './SliceClass.js';
/**
 * Trip Class - comprises of the Flight duration and Array of Slice object
 **/
export default class Trip extends Slice {
    /**
     * @param {boolean} missedConnections - -
     * @param {object} passengerCounts - Passenger count object having the total count of travelling passengers.
     * @param {string} data - [OPTIONAL] any client specific key-value pair specific to trip.
     * @param {object[]} slices - Slice object having trip info. Trip can have multiple slices.
     **/
    constructor(missedConnections, passengerCounts, data, slices) {
        super();
        this._missedConnections = missedConnections;
        this._passengerCounts = passengerCounts;
        this._data = data;
        this._slices = slices;
    }
}
