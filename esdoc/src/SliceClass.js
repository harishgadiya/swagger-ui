/**
 * Created by priyanka on 18/4/16.
 */
/**
 * Slice object
 */
import Segment from './SegmentClass.js';
/**
 * A slice represents a traveller's intent, the portion of a low-fare search corresponding to a traveler's request to get between two points. One-way journeys are generally expressed using 1 slice, round-trips using 2.
 * The slices make up a trip's itinerary.
 **/
export default class Slice extends Segment {
    /**
     * @param {number} duration - Flight duration (to reach from source to the destination)
     * @param {object[]} segment - Segment object having flight data. Slice can have multiple segments
     **/
    constructor(duration, segment) {
        super();
        this._duration = duration;
        this._segment = segment;
    }
}
