/**
 * Created by priyanka on 18/4/16.
 */
/**
 * Segment object - Segments are the number of flights changed
 */
import Leg from './LegClass.js';
/**
 * A segment is one or more consecutive legs on the same flight.The segment(s) constituting the slice.
 **/

export default class Segment extends Leg {
    /**
     * @param {number} duration - Flight duration
     * @param {object} flight - Flight object having flight details
     * @param {string} cabin - Booked Cabin in the Flight
     * @param {string} bookingCode - The booking code or class for this segment.
     * @param {number} bookingCodeCount - The number of seats available in this booking code on this segment.
     * @param {string} data - [OPTIONAL] any client specific key-value pair specific to segment
     * @param {object[]} leg - Leg object comprising of the details about the hop taken by a flight.Segment can have multiple legs
     **/
    constructor(duration, flight, cabin, bookingCode, bookingCodeCount, data, leg) {
        super();
        this._duration = duration;
        this._flight = flight;
        this._cabin = cabin;
        this._bookingCode = bookingCode;
        this._bookingCodeCount = bookingCodeCount;
        this._data = data;
        this._leg = leg;
    }
}
