import {handleActions} from 'redux-actions';

const crowdOrder = handleActions({
    ['init'](state, action) {
        const payload = action.payload
        const {addressList,raiseItem} = payload;
        let selectedAddress = null;
        let addressId=null;
        if (addressList && addressList.length > 0) {
            selectedAddress = addressList[0];
            addressId=addressList[0].addressId;
        }

        return {
            ...state,
            ...payload,
            selectedAddress,
            addressId:addressId,
            raiseItem:raiseItem.raiseItemId,
            isInit:true
        };
    },
    ['selectAddress'](state, action) {
        const payload = action.payload
        return {
            ...state,
            selectedAddress: payload,
            isInit: false
        }
    },

}, {
    selectedAddress: null,
    addressList: [],
    addressId:"",
    raiseItem:"",
    isInit: false
});
export default crowdOrder;