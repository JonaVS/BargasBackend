## BARGAS RESTOBAR BACKEND
**NOTE: THIS PROJECT IS UNDER DEVELOPMENT.**

## Project Description:
Concept/prototype website & online ordering platform for a restobar.

You are currently looking the backend repo. 

## Where's the frontend?
I'm using a Gatsby/React project for that, which you can find here: [BargasFrontend](https://github.com/JonaVS/BargasFrontend)

## Backend features (for now):

- Admin Panel with role based access.
- Menu products management via CMS user interface.
- Menu products REST API endpoints.
- Custom Auth with HttpOnly cookies (just for the frontend client).

## Pending backend features:

- **Backend order placing:** This includes database tables, endpoints logic and communication with a payment gateway.
- **Admin panel section to manage orders.**
- **Email sender service:** This is needed to send notifications when the business recives an order, to send invoices to clients and to send password recovery instructions.
- **REST API endpoints related to users:** This includes getting user placed orders, basic info edit and password change. This is only for authenticated users.
- **Promos/events:** This includes database tables to store this information and the API endpoints.
- **Admin panel section to manage promos/events.**
  
## Backend & cloud technologies:

- Strapi CMS 
- Node.js / Koa.js
- AWS RDS - MySQL
- Cloudinary

