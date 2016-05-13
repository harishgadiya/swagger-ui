/**
 * Created by priyanka on 18/4/16.
 */
/**
 * Date of birth Details - gives the DOB for the passenger
 */
export default class DateOfBirth {
/**
 * @param {number} year - birth year of the passenger
 * @param {number} month - birth month of the passenger
 * @param {number} day - birth date of the passenger
 **/
    constructor(year, month, day) {
        this._year = year;
        this._month = month;
        this._day = day;
    }
}