"use strict";
const Emailvalidator = require("email-validator");

module.exports = {
  async handleContactFormSubmission(ctx) {
    const formData = ctx.request.body;
    try {
      if (!formData.name || !formData.email || !formData.message)
        return ctx.badRequest("The submitted data is invalid");

      if (!Emailvalidator.validate(formData.email))
        return ctx.badRequest("Invalid email");

      if (formData.message.length > 300)
        return ctx.badRequest(
          "Message lenght should be equal or less than 300 characters"
        );

      await strapi
        .plugin("email-designer")
        .service("email")
        .sendTemplatedEmail(
          {
            to: process.env.CONTACT_NOTIFICATION_EMAIL,
            replyTo: formData.email  
          },
          {
            templateReferenceId: 3,
            subject: `[Formulario de contacto] - Nuevo Mensaje`,
          },
          {
            submitterName: formData.name,
            submitterEmail: formData.email,
            submitterMessage: formData.message,
          }
        );

        ctx.response.body = {success : true}
        
    } catch (err) {
      strapi.log.debug("📺: ", err);
      return ctx.internalServerError('The message cannot be sent. Try again.');
    }
  },
};
