"use strict";

const { v4: uuid } = require("uuid");

//Builds the order object required by the payment gateway.
const getPaymentGatewayObject = (clientOrder) => {
  const { orderBasicInfo, orderDetails } = clientOrder;

  const getOrderDetails = () => {
    const gatewayOrderDetails = [];
    for (const orderDetail of orderDetails) {
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
    amount: orderBasicInfo.total,
    currency: "CRC",
    description: "Pago orden Bargas",
    orderReference: orderBasicInfo.id.toString(),
    callback: "http://localhost:8000/app/ordering-result",
    additional: {
      customer: {
        name: orderBasicInfo.clientName,
        email: orderBasicInfo.clientEmail,
        identification: "N/A",
        billingAddress: {
          country: "CR",
          province: orderBasicInfo.province,
          street1: orderBasicInfo.address,
        },
        shippingAddress: {
          country: "CR",
          province: orderBasicInfo.province,
          street1: orderBasicInfo.address,
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
