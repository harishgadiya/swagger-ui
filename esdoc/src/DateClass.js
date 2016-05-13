/**
 * Created by priyanka on 18/4/16.
 */
/**
 * Flight booking date Details
 */
export default class Date {
    /**
     * @param {number} year - year of booking
     * @param {number} month - month of booking
     * @param {number} day - date of booking
     **/

    constructor(year, month, day) {
        this._year = year;
        this._month = month;
        this._day = day;
    }
}