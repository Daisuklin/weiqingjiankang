import {handleActions} from 'redux-actions';

const order = handleActions({
    ['init'](state, action) {
        const payload = action.payload
        const {addressList,specId} = payload;
        let selectedAddress = null;
        if (addressList && addressList.length > 0) {
            selectedAddress = addressList[0]
        }
        return {
            ...state,
            ...payload,
            selectedAddress,
            specId: specId,
            goods:payload,
            goodsPrice:payload.bargainPrice,
            bargainId:payload.bargainId,
            isInit: false
        };
    },
    ['getPrice'](state, action) {
        const payload = action.payload
        return {
            ...state,
            priceData: payload,
            freight:payload.shippingFee,
            totalPrice:parseFloat(parseFloat(payload.shippingFee)+parseFloat(payload.bargainPrice)).toFixed(2)
        };
    },
    ['addShipping'](state, action) {
        const payload = action.payload
        return {
            ...state,
            freight: payload.freight,
            totalPrice:parseFloat(parseFloat(payload.freight)+parseFloat(payload.goodsPrice)).toFixed(2)
        };
    },
    ['changePd'](state, action) {
        const payload = action.payload
        return {
            ...state,
            ...payload
        };
    },
    ['invoiceChange'](state, action) {
        const payload = action.payload
        return {
            ...state,
            invoice: payload,
            isInit: false
        }
    },
    ['selectAddress'](state, action) {
        const payload = action.payload
        return {
            ...state,
            selectedAddress: payload,
            isInit: false
        }
    },
    ['updateShip'](state, action) {
        const {
            storeId,
            shipType
        } = action.payload

        console.log(storeId, shipType);

        const {cartVoList} = state;
        const mapedcartVoList = cartVoList.map(shop => {
            if (shop.storeId == storeId) {
                shop.selectedShip = shipType
            }
            return shop;
        })
        return {
            ...state,
            cartVoList: mapedcartVoList
        };
    },
}, {
    specId: '',
    bargainId:'',
    selectedAddress: {},
    totalPrice: "0.0",
    goodsPrice:"0.0",
    shipData: {},
    isPd: 1,
    freight: null,
    paytype: 1,
    invoice: null,
    addressList: [],
    memberAvailable: '0.0',
    goods:{},
    isInit: true
});

export default order;
