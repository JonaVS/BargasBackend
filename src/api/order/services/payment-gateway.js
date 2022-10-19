"use strict";

const axios = require('axios');
const { getPaymentGatewayObject } = require("./helpers/paymentGatewayObj");
const { OperationResult } = require("../../../utils/OperationResult.js");

const getPaymentSessionToken = async (clientOrder) => {
  const GATEWAY_SESSION_URL =
    process.env.NODE_ENV === "production"
      ? process.env.GATEWAY_PROD_SESSION_URL
      : process.env.GATEWAY_SANDBOX_SESSION_URL;
  try {
    const { data } = await axios.post(
      GATEWAY_SESSION_URL,
      getPaymentGatewayObject(clientOrder)
    );
    return OperationResult.success(data)
  } catch (err) {
    return OperationResult.error("Error generating payment session")
  }
};

module.exports = {
  getPaymentSessionToken,
};
