/**
 * Created by priyanka on 18/4/16.
 */
/**
 * this is The Purchase Data Class.
 */
import TripData from './TripDataClass.js';

/**
 * Purchase Data Class - comprising of the Pricing ID from Pricing API and Trip Data(having trip ID and userInfo) from TripData Class,
 * returning us the Purchase object
 */
export default class PurchaseData extends TripData {
    /**
     * @param {number} priceRequestId - This is the pricing ID , received from the pricing API
     * @param {string} clientNonce - ClientNonce can be GOLD, PREMIUM or PLATINUM
     * @param {string} priceTier - PriceTier
     * @param {Object} tripData - This is received from the TripData class
     * @param {string} pciTransactionId - Payment Transaction ID
     * @param {string} data - Data having payment related details of the purchased transaction
     **/
    constructor(priceRequestId, clientNonce, priceTier,tripData, pciTransactionId, data) {
        super();
        this._priceRequestId = priceRequestId;
        this._clientNonce = clientNonce;
        this._priceTier = priceTier;
        this._tripData = tripData;
        this._pciTransactionId = pciTransactionId;
        this._data = data;
    }
}