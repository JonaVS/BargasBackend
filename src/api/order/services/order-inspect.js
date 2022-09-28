"use strict";

const { OperationResult } = require("../../../utils/OperationResult.js");

const inspectOrder = async (clientOrder = {}) => {
  try {
    const { orderGeneralInfo, clientCart } = clientOrder;
    if (!orderGeneralInfo || !clientCart)
      return OperationResult.error("Invalid order data");

    //Stores the items that are not available.
    const unavailableItems = [];

    /*Get server product data. For this use case where the amount of items/products is going 
    to be small, a simple  query to get all products is ok.*/
    const productData = await strapi.entityService.findMany(
      "api::product.product",
      {
        populate: ["mains", "sides", "sauces", "sizes"],
      }
    );

    /*Rebuild the client cart with server side data"*/
    for (let cartItem of clientCart) {
      const serverItem = productData.find((x) => x.id === cartItem.productId);

      if (!serverItem) return OperationResult.error("Invalid product data");

      if (!serverItem.available) {
        unavailableItems.push({ id: serverItem.id, product: serverItem.name });
        continue;
      }

      cartItem.name = serverItem.name;
      cartItem.price = serverItem.price;
      cartItem.discount = serverItem.discount;
      cartItem.total =
        (serverItem.price - (serverItem.price * serverItem.discount) / 100) *
        cartItem.quantity;
    }

    if (unavailableItems.length > 0) {
      return OperationResult.error("Unavailable Items", unavailableItems);
    } else {
      return OperationResult.success();
    }
  } catch (err) {
    return OperationResult.error("Error validating order");
  }
};

module.exports = {
  inspectOrder,
};
