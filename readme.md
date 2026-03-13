## FleetFlow-Server: Vehicle Rental System

**Live URL:** [https://fleetflow-server.vercel.app/](https://fleetflow-server.vercel.app/)

> A robust, production-ready Vehicle Rental System Management REST API built with Node.js, TypeScript, and PostgreSQL — designed to streamline vehicle tracking, driver management, and operational logistics at scale.

---

## Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Usage](#-api-usage)

---

## Features

- **JWT Authentication** — Secure token-based auth with `jsonwebtoken` and password hashing via `bcryptjs`
- **PostgreSQL Integration** — Persistent data storage powered by a Neon serverless Postgres database
- **Fleet Management** — Full CRUD operations for vehicles, drivers, and trips
- **TypeScript-first** — Strict type safety with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` enabled
- **Hot Reload Dev Server** — Fast iteration with `nodemon` + `tsx` for a seamless developer experience
- **Express 5** — Built on the latest Express.js with modern async/await error handling

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Language** | TypeScript 5 |
| **Framework** | Express.js 5 |
| **Database** | PostgreSQL (Neon Serverless) |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs |
| **Dev Tooling** | tsx, nodemon, tsc |

---

## Project Structure

```
fleetflow-server/
├── src/
│   ├── config/
│   │   ├── db.ts                    # PostgreSQL client & connection setup
│   │   └── index.ts                 # Config exports
│   ├── middlewares/
│   │   └── auth.ts                  # JWT authentication middleware
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controllers.ts  # Login & register handlers
│   │   │   ├── auth.routes.ts       # Auth route definitions
│   │   │   └── auth.services.ts     # Auth business logic
│   │   ├── bookings/
│   │   │   ├── bookings.controllers.ts
│   │   │   ├── bookings.routes.ts
│   │   │   └── bookings.services.ts
│   │   ├── users/
│   │   │   ├── user.controllers.ts
│   │   │   ├── user.routes.ts
│   │   │   └── user.services.ts
│   │   └── vehicles/
│   │       ├── vehicle.controllers.ts
│   │       ├── vehicle.routes.ts
│   │       └── vehicle.services.ts
│   ├── types/
│   │   └── express/
│   │       └── index.d.ts           # Express type augmentations
│   ├── app.ts                       # Express app setup & route mounting
│   └── server.ts                    # App entry point
├── dist/                            # Compiled JS output (generated)
├── .env                             # Environment variables (not committed)
├── .gitignore
├── package.json
├── tsconfig.json
└── vercel.json                      # Vercel deployment config
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **PostgreSQL** database (e.g. [Neon](https://neon.tech))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ameerhamzahd/FleetFlow-Server.git
cd fleetflow

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your database connection string and JWT secret

# 4. Start the development server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled production build |

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# PostgreSQL connection string
CONNECTION_STRING=postgresql://<user>:<password>@<host>/<database>

# Secret key for signing JWT tokens
JWT_SECRET=your_super_secret_key
```

> **Never commit your `.env` file.** Add it to `.gitignore`.

---

## API Usage

All endpoints return JSON. Protected routes require a `Bearer` token in the `Authorization` header.

```http
Authorization: Bearer <your_jwt_token>
```

---

### Authentication Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/signup` | PUBLIC | Create a new user |
| `POST` | `/api/v1/auth/signin` | PUBLIC | Sign in and receive a JWT |

---

### Vehicles Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/vehicles` | PUBLIC | List all vehicles |
| `POST` | `/api/v1/vehicles` | ADMIN | Add a new vehicle |
| `GET` | `/api/v1/vehicles/:id` | PUBLIC | Get vehicle details |
| `PUT` | `/api/v1/vehicles/:id` | ADMIN | Update a vehicle |
| `DELETE` | `/api/v1/vehicles/:id` | ADMIN | Remove a vehicle |

---

### Users Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/users` | ADMIN | Get all users |
| `PUT` | `/api/v1/users/:userId` | ADMIN / OWN | Update user status or own profile |
| `DELETE` | `/api/v1/users/:id` | ADMIN | Remove a user |

---

### Bookings Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/bookings` | ROLE-BASED | List all bookings |
| `POST` | `/api/v1/bookings` | CUSTOMER / ADMIN | Create a booking |
| `PUT` | `/api/v1/bookings/:bookingId` | ROLE-BASED | Update booking status |