"use strict";

const sendOrderNotificationEmail = async (orderData) => {

  //i = 0 is for Business and i = 1 for Client
  for (let i = 0; i < 2; i++) {
    try {
      await strapi
        .plugin("email-designer")
        .service("email")
        .sendTemplatedEmail(
          {
            to: i === 0 ? process.env.ORDERS_NOTIFICATION_EMAIL : orderData.clientEmail ,
          },
          {
            templateReferenceId: i === 0 ? 1 : 2,
            subject: `Orden Bargas # ${orderData.orderId}`,
          },
          {
            clientInfo: {
              clientName: orderData.clientName,
              clientPhone: orderData.phone,
              province: orderData.province,
              address: orderData.address,
            },
            orderId: orderData.orderId,
            paymentType: orderData.paymentType,
            date: new Date(orderData.date.toString()).toLocaleString({ hour12: true }),
            products: orderData.orderDetails,
            deliveryCost: orderData.deliveryCost,
            subTotal: orderData.total - orderData.deliveryCost,
            total: orderData.total,
          }
        );
    } catch (err) {
      strapi.log.debug("📺: ", err);
    }
  }
  return;
};

module.exports = {
  sendOrderNotificationEmail,
};
