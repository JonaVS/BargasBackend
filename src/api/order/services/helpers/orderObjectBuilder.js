const { v4: uuid } = require('uuid');
const moment = require('moment-timezone');

const getServerGeneratedFields = (clientOrder) => {
  
  //Get cart total
  let orderTotal = 0
  clientOrder.clientCart.forEach(cartItem => {
    orderTotal += cartItem.total
  })
  return {
    orderId: uuid(),
    paymentId: '',
    date: moment().tz("America/Costa_Rica").format(),
    status: "pending",
    user: null,
    deliveryCost: 2000,
    subtotal: orderTotal,
    total: orderTotal + 2000,
  };
};

module.exports = {
  getServerGeneratedFields,
};
