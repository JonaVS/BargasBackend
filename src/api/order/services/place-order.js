"use strict";

const {
  getServerGeneratedFields,
} = require("./helpers/orderObjectBuilder");

const { OperationResult } = require("../../../utils/OperationResult.js");

/*
  Validation will be triggered here at Strapi schema level.
*/
const placeOrder = async (clientOrder) => {

  let orderBasicInfo = {}
  let orderDetails = [];

  try {
    const serverOrderFields = getServerGeneratedFields(clientOrder);

    orderBasicInfo = await strapi.entityService.create("api::order.order", {
      data: {
        ...serverOrderFields,
        ...clientOrder.orderGeneralInfo,
      },
      fields: [
        "id",
        "total",
        "clientName",
        "clientEmail",
        "province",
        "address",
      ],
    });

    /*Strapi doesn't support "bulk/batch" creation of entities yet.*/
    for (let cartItem of clientOrder.clientCart) {
      const orderDetail = await strapi.entityService.create(
        "api::order-detail.order-detail",
        {
          data: {
            order: orderBasicInfo.id,
            product: cartItem.productId,
            ...cartItem,
          },
          fields: ["id", "quantity", "total"],
          populate: ["product"],
        }
      );
      orderDetails.push(orderDetail);
    }
    return OperationResult.success({ orderBasicInfo, orderDetails });
  } catch (err) {
    return OperationResult.error("Error placing order");
  }
};

module.exports = {
  placeOrder,
};