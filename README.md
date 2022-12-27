## BARGAS BACKEND (Strapi headless CMS)

## Project Description:
Concept/prototype website & online ordering platform for a restobar.

You are currently looking the backend repo. 

## Where's the frontend?
I'm using a Gatsby/React project for that, which you can find [here](https://github.com/JonaVS/BargasFrontend).

I'm not a monorepo fan :sweat_smile:

## What's Strapi?
Strapi is a headlesss CMS that can be self-hosted and fully customizable. If interested, visit their oficial [site](https://strapi.io/) to learn more.

## Backend/admin panel features:

- Admin Panel with role based access.
- Management of: general website info, menu products, event/promos, orders and users.
- Storage of media assets via Cloudinary services.
- Menu products REST API endpoints. Only GET endpoints are open to the public.
- Custom Auth with HttpOnly cookies. The default Strapi implementation was overriden.
- Backend order placing implementation with custom API Endpoints, logic and integration with [Greenpay](https://greenpay.me/) payment gateway.
- Custom endpoint that the payment gateway uses as a Webhook to notify the Strapi backend for payment transactions to automatically update order payment related info.
- Integration of Zoho mail services for Email notifications.
- Email designer via admin panel plugin.
- REST API endpoints + custom policies related to users. This includes getting user placed orders, basic info edit and password change. This endpoints are only for authenticated users.
  
## Backend technologies, cloud technologies & other services:

- Strapi CMS 
- Node.js / Koa.js
- AWS RDS - MySQL
- Cloudinary
- Zoho mail services
- Greenpay payment gateway

