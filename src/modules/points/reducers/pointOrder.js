import {handleActions} from 'redux-actions';

const pointOrder = handleActions({
    ['init'](state, action) {
        const payload = action.payload
        const {addressList, cartVoList, map} = payload;
        let selectedAddress = null;
        if (addressList && addressList.length > 0) {
            selectedAddress = addressList[0]
        }
        return {
            ...state,
            ...payload,
            selectedAddress,
            cartVoList,
            totalPrice: map,
            cartId: action.cartId,
            isInit: true
        };
    },
    ['selectAddress'](state, action) {
        const payload = action.payload
        return {
            ...state,
            selectedAddress: payload,
            isInit: true
        }
    },
}, {
    cartId: null,
    selectedAddress: {},
    totalPrice: 0,
    addressList: [],
    cartVoList: [],
    isInit: false
});

export default pointOrder;
