const moment = require('moment-timezone');
const { customAlphabet } = require('nanoid/async');

const getServerGeneratedFields = async (clientOrder) => {

  //Potential values for an order ID and max size
  const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12)

  //Generates the order id
  const orderId = await nanoId()
  
  //Get cart total
  let orderTotal = 0
  clientOrder.clientCart.forEach(cartItem => {
    orderTotal += cartItem.total
  })

  return {
    orderId: orderId,
    paymentId: '',
    date: moment().tz("America/Costa_Rica").format(),
    status: "pending",
    user: clientOrder.user ? clientOrder.user : null,
    deliveryCost: 2000,
    subtotal: orderTotal,
    total: orderTotal + 2000,
  };
};

module.exports = {
  getServerGeneratedFields,
};
