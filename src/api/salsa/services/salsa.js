'use strict';

/**
 * salsa service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::salsa.salsa');
