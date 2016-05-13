/**
 * Created by priyanka on 18/4/16.
 */
/**
 * Flight Details - gives the details of the flight
 */
export default class Flight {
    /**
     * @param {number} airlineCode - Airline code of the flight
     * @param {number} flightNumber - Flight number of the flight
     * @param {string} date - Departure date (format: YYYY-MM-DD)
     **/
    constructor(airlineCode, flightNumber, date) {
        this._airlineCode = airlineCode;
        this._flightNumber = flightNumber;
        this._date = date;
    }
}