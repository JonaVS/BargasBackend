"use strict";

module.exports = {
  /*
    This method will update the paymentId field of the specified order 
    and notify the business and client via Email that an order has been placed.

    Payment gateway wiil trigger this as a Webhook.
  */
  async handlePaymentResult(ctx) {

    const paymentData = ctx.request.body;

    if (!paymentData.orderId || !paymentData.result.success)
      return ctx.badRequest("Unable to process order");

    /*Get the specified order from the DB*/
    try {
      const order = await strapi.entityService.findOne(
        "api::order.order",
        paymentData.orderId,
        {
          fields: ["*"],
          populate: {
            orderDetails: { populate: { product: true } },
          },
        }
      );

      if (!order) 
        return ctx.badRequest("Specified order does not exist");
      
      /*Update specified order paymentdId field*/
      await strapi.entityService.update("api::order.order", paymentData.orderId, {
        data: {
          paymentId: paymentData.authorization,
        },
      });

      /*Send Email notification to business and client */
      await strapi
        .service("api::order.order-mail-sender")
        .sendOrderNotificationEmail(order);

      ctx.body = { success: true };
    } catch (err) {
      strapi.log.debug("📺: ", err);
    }
  },
};
