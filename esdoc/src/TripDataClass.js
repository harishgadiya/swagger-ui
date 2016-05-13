/**
 * Created by priyanka on 18/4/16.
 */
/**
 * this is The Trip Data Class.
 */
import PersonDetails from './PersonDetailsClass.js';

/**
 * Trip Data Class - comprising of the Trip ID from Pricing API and Person Details from PersonDetails Class,
 * returns us the Trip data for Purchase object
 */
export default class TripData extends PersonDetails {
    /**
     * @param {string} id - Trip ID received from the Pricing API
     * @param {Object} personInfo - Person details received from PersonDetails Class
     */
    constructor(id, personInfo) {
        this._id = id;
        super();
    }
}