module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "*.greenpay.me"],
          "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          "script-src": ["'self'", "editor.unlayer.com"],
          "frame-src": ["'self'", "editor.unlayer.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      credentials: true,
      origin: process.env.ALLOWED_ORIGINS.split(','),
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "Access-Control-Allow-Origin",
      ],
    },
  },
  "global::authCookieGetter",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "global::authCookieSetter",
  "strapi::favicon",
  "strapi::public",
];
