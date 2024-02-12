const Cart = require('../model/cart.model');

class CartService {
    async createOrUpdateCart (user_id,goods_id) {
        // return await cartModel.createOrUpdateCart(user_id,goods_id);
        return {
            id:1,
            user_id:13,
            goods_id:123,
            number:1,
            selected:true
        }
    }
}

module.exports = new CartService();