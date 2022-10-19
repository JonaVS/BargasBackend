"use strict";

module.exports = {
  async placeOrder(ctx) {

    const clientOrder = ctx.request.body
    const paymentType = clientOrder.orderGeneralInfo.paymentType 
    let checkoutFormUrl = ''

    try {
      //Inspects and rebuild client cart data.
      const inspectionResult = await strapi
        .service("api::order.order-inspect")
        .inspectOrder(clientOrder);

      if (!inspectionResult.success)
        return ctx.badRequest(inspectionResult.errorMessage, {
          data: inspectionResult.data,
        });

      //Placing order attempt (Order & order details into database)
      const placingResult = await strapi
        .service("api::order.place-order")
        .placeOrder(clientOrder);

      if (!placingResult.success)
        return ctx.internalServerError(placingResult.errorMessage, { details: "" });

      /*
        Communication with payment gateway IF payment method used is Card.
        Gets payment session & builds checkout URL.
      */  
      if (paymentType === "Card") {
        const gatewayResult = await strapi
          .service("api::order.payment-gateway")
          .getPaymentSessionToken(placingResult.data);

        if (!gatewayResult.success){
          return ctx.internalServerError(gatewayResult.errorMessage, { details: "" }); 
        }

        const session = gatewayResult.data.session
        checkoutFormUrl = `${process.env.GREENPAY_CHECKOUT_URL}${session}`
      }

      /*
        Send order placing notification via Email to business and client
        ONLY IF the uses payment method IS NOT CARD.

        Notifications for Orders placed with Card are handled by a server POST endpoint which
        the payment gateway uses as a Webhook to send the payment result.
      */
     if (paymentType != "Card") {
       await strapi
         .service("api::order.order-mail-sender")
         .sendOrderNotificationEmail(placingResult.data);
     } 
 
      ctx.body = {success: true, paymentGateway: paymentType === "Card" ? checkoutFormUrl : ''}

    } catch (err) {
      ctx.body = err.data;
    }
  },
};
