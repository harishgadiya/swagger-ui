/**
 * Created by priyanka on 18/4/16.
 */
/**
 * Passenger count - stores the count of passengers, categorizing them under the head of Infant, Child,
 * adult or senior citizen.
 */
export default class PassengerCount {
    /**
     * @param {number} adult - Count of adult passengers
     * @param {number} child - Count of child passengers
     * @param {number} infantInLap - Count of infant in lap passengers
     * @param {number} infantInSeat - Count of infant in seat passengers
     * @param {number} senior - Count of senior passengers
     **/
    constructor(adult, child, infantInLap, infantInSeat, senior) {
        this._adult = adult;
        this._child = child;
        this._infantInLap = infantInLap;
        this._infantInSeat = infantInSeat;
        this._senior = senior;
    }
}