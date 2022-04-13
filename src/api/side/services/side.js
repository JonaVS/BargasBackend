'use strict';

/**
 * side service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::side.side');
