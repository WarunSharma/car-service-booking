# 🚗 Car Booking Microservices

A modular and production-ready car booking system built using **Node.js**, **Express**, **Prisma**, **PostgreSQL**, and **Docker**. The system is designed using a **microservice architecture** for better scalability and maintainability.

---

## 📦 Services

| Service            | Description                             | Port  |
|--------------------|-----------------------------------------|-------|
| **user-service**    | Handles user registration, login, profile | 4002 |
| **appointment-service** | Manages car service appointments          | 4001 |

---

## 🧱 Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL (via Prisma ORM)
- Docker & Docker Compose
- JWT Authentication
- Swagger API Docs
- Render (Free Hosting)
  
---

## 📁 Folder Structure

```
car-booking-service/
├── services/
│   ├── user-service/
│   │   ├── Dockerfile
│   │   ├── prisma/
│   │   ├── src/
│   │   └── .env
│   └── appointement-service/
│       ├── Dockerfile
│       ├── prisma/
│       ├── src/
│       └── .env
└── docker-compose.yml   <-- (optional if running locally)
```

## 🚀 Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/car-booking-service.git
cd car-booking-service
```

### 2. Set up environment files

Create .env files inside each service directory:

services/user-service/.env
```
PORT=4002
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
```
services/appointment-service/.env
```
PORT=4001
DATABASE_URL=your_postgres_url
```

## 3. Install dependencies and migrate DB
Inside each service folder:

```bash
npm install
npx prisma migrate dev --name init
```

## 4. Run with Docker Compose (Optional)

```bash
docker-compose up --build
```

## 🌐 API Documentation
Each service includes Swagger-based API docs.

Once deployed or running locally:

- User Service: http://localhost:4002/api-docs

- Appointment Service: http://localhost:4001/api-docs

## 🚀 Deployment (Free via Render)
Each service can be deployed as a separate Render Web Service.

### Steps:

- Push to GitHub

- Create new Web Service on Render

- Set root directory (services/user-service, etc.)

- Add env vars (PORT, DATABASE_URL, etc.)

- Render auto-builds and deploys from Dockerfile

## 🧑‍💻 Author
Made with ❤️ by Warun Sharma