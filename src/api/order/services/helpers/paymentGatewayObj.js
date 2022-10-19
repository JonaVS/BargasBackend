"use strict";

const { v4: uuid } = require("uuid");

//Builds the order object required by the payment gateway.
const getPaymentGatewayObject = (clientOrder) => {

  const getOrderDetails = () => {
    const gatewayOrderDetails = [];
    for (const orderDetail of clientOrder.orderDetails) {
      gatewayOrderDetails.push({
        description: orderDetail.product.name,
        skuId: orderDetail.product.id.toString(),
        quantity: orderDetail.quantity,
        price:
          orderDetail.product.price -
          (orderDetail.product.price * orderDetail.product.discount) / 100,
        type: "Menu item",
      });
    }
    return gatewayOrderDetails;
  };

  const gatewayObject = {
    secret: process.env.GREENPAY_SECRET,
    merchantId: process.env.GREENPAY_MERCHANT_ID,
    terminal: process.env.GREENPAY_TERMINAL_ID,
    amount: clientOrder.total,
    currency: "CRC",
    description: "Pago orden Bargas",
    orderReference: clientOrder.id.toString(),
    callback: "http://localhost:8000/app/ordering-result",
    additional: {
      customer: {
        name: clientOrder.clientName,
        email: clientOrder.clientEmail,
        identification: "N/A",
        billingAddress: {
          country: "CR",
          province: clientOrder.province,
          street1: clientOrder.address,
        },
        shippingAddress: {
          country: "CR",
          province: clientOrder.province,
          street1: clientOrder.address,
        },
      },
      products: getOrderDetails(),
    },
  };
  return gatewayObject;
};

module.exports = {
  getPaymentGatewayObject,
};
