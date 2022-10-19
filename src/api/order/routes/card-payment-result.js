module.exports = {
  routes: [
    {
      method: "POST",
      path: "/order/payment-result",
      handler: "payment-result.handlePaymentResult",
    },
  ],
};
