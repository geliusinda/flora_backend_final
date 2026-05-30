# Flora Backend Final

Backend REST API for the Flora final project.

The project uses Express, PostgreSQL, Sequelize, Joi validation, Multer photo upload and Swagger UI documentation.

## What is implemented

- Express server with separated layers: routes, controllers, services, schemas, middlewares, helpers, configs and models
- PostgreSQL connection through Sequelize
- Centralized error handling
- CRUD API for bouquets
- Joi validation for create, update and favorite endpoints
- Multer upload for bouquet photos
- Static photo serving from `public/photos`
- Swagger UI documentation
- Seed script for bouquets
- Extra frontend collections: flowers and feedback

## Project structure

```text
flora_backend_final
├── data
│   └── db.json
├── docs
│   └── swagger.json
├── public
│   └── photos
├── scripts
│   └── seedBouquets.js
├── src
│   ├── configs
│   ├── controllers
│   ├── db
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── schemas
│   └── services
├── temp
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── README.md
└── server.js
```

## Local setup

Install dependencies:

```bash
npm install
```

Create `.env` from example:

```bash
cp .env.example .env
```

For PowerShell on Windows:

```powershell
copy .env.example .env
```

Open `.env` and add your PostgreSQL database URL.

Example:

```env
PORT=3000
CLIENT_URL=*
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DB_SSL=true
```

For Render PostgreSQL use:

```env
DB_SSL=true
```

For local PostgreSQL use:

```env
DB_SSL=false
```

## Run server

```bash
npm start
```

For development:

```bash
npm run dev
```

Successful database connection message:

```text
Database connection successful
```

Server message:

```text
Server is running on port 3000
```

## Seed database

Run this once after the database is connected:

```bash
npm run seed
```

The seed script reads bouquets from:

```text
data/db.json
```

## Swagger UI

Local Swagger URL:

```text
http://localhost:3000/api-docs
```

Swagger file:

```text
docs/swagger.json
```

## API routes

```text
GET    /api/health
GET    /api/flowers
GET    /api/feedback
GET    /api/bouquets
GET    /api/bouquets/:bouquetId
POST   /api/bouquets
PUT    /api/bouquets/:bouquetId
DELETE /api/bouquets/:bouquetId
PATCH  /api/bouquets/:bouquetId/favorite
PATCH  /api/bouquets/:bouquetId/photo
GET    /api-docs
```

## Query parameters for bouquets

```text
GET /api/bouquets?page=1&limit=15
GET /api/bouquets?search=rose&page=1&limit=15
GET /api/bouquets?sort=newest
GET /api/bouquets?sort=oldest
```

Response example:

```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "perPage": 15,
  "totalPages": 1
}
```

## Create bouquet example

```http
POST /api/bouquets
Content-Type: application/json
```

```json
{
  "title": "Peach Meadow",
  "description": "A soft and radiant arrangement of peach and blush roses.",
  "price": "$55",
  "photoURL": "./images/peach_meadow.jpg",
  "image2x": "./images/peach_meadow@2x.jpg",
  "alt": "Peach Meadow bouquet",
  "favorite": false
}
```

Required fields:

```text
title
description
price
```

If `photoURL` is not provided, the server creates a default gravatar URL.

## Update bouquet example

```http
PUT /api/bouquets/1
Content-Type: application/json
```

```json
{
  "title": "Updated bouquet",
  "price": "$60"
}
```

Empty body returns `400`.

## Update favorite example

```http
PATCH /api/bouquets/1/favorite
Content-Type: application/json
```

```json
{
  "favorite": true
}
```

## Upload photo example

```http
PATCH /api/bouquets/1/photo
Content-Type: multipart/form-data
```

Form-data field:

```text
photo: image file
```

Uploaded files are saved to:

```text
public/photos
```

The response returns updated bouquet with new `photoURL`.

## Frontend connection

In frontend JavaScript set:

```js
const API_URL = "http://localhost:3000/api";
const SERVER_URL = "http://localhost:3000";
```

For Render deploy replace both with your deployed backend URL:

```js
const API_URL = "https://your-backend-name.onrender.com/api";
const SERVER_URL = "https://your-backend-name.onrender.com";
```

For backend uploaded photos use:

```js
const getImageUrl = (item) => {
  const image = item.image || item.photo || item.photoURL || "";
  if (image.startsWith("/photos/")) {
    return `${SERVER_URL}${image}`;
  }
  return image;
};
```

## Render deploy notes

Add these environment variables in Render:

```text
PORT
CLIENT_URL
DATABASE_URL
DB_SSL
```

Recommended values:

```env
CLIENT_URL=*
DB_SSL=true
```

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

After deploy, open:

```text
https://your-backend-name.onrender.com/api/health
https://your-backend-name.onrender.com/api-docs
```
Swagger UI is available at /api-docs.
