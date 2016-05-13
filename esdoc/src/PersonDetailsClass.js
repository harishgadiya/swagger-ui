/**
 * Created by priyanka on 18/4/16.
 */

import DateOfBirth from './DOBClass.js';

/**
 * Person Details - saves the basic details about the passenger.
 */
export default class PersonDetails extends DateOfBirth {
    /**
    * @param {string} gender - Gender of the passenger
    * @param {string} firstName - First name of the passenger
    * @param {string} lastName - Last name of the passenger
    * @param {string} middleName - Middle name of the passenger
    * @param {object} dateOfBirth - Date Of Birth of the passenger
    * @param {string} phone - Phone number of the passenger
    * @param {string} email - Email of the passenger
    * @param {boolean} isDeciderToPay - Is he the decider to pay?
    * @param {boolean} isPayer - Is he the Payer?
    * @param {boolean} isPassenger - Is he the passenger himself?
    * @param {boolean} isBookingPerson - Is he the booking person?
    */
    constructor(gender,firstName,lastName, middleName, dateOfBirth,
                phone, email, isDeciderToPay, isPayer, isPassenger, isBookingPerson) {
        super();
        this._gender = gender;
        this._firstName = firstName;
        this._lastName = lastName;
        this._middleName = middleName;
        this._dateOfBirth = dateOfBirth;
        this._phone = phone;
        this._email = email;
        this._isDeciderToPay = isDeciderToPay;
        this._isPayer = isPayer;
        this._isPassenger = isPassenger;
        this._isBookingPerson = isBookingPerson;
    }
}