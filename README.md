# 🍔 Fast Food Microservices Project

## 📌 Overview
This project demonstrates a microservices architecture with 4 services:
- User Service
- Product Service
- Order Service
- Payment Service

## 🛠 Technologies
- Node.js, Express
- MongoDB
- Docker
- React (Frontend)

## 📂 Project Structure
See `docs/architecture.md` for details.

## ⚙️ Set up
Cách bật các services:
1. Bật docker desktop
2. docker-compose build
3. docker-compose up -d
4. docker ps

Cách tắt các services:
1. docker-compose down
2. docker-compose down -v

# 🧑‍💻 User Service

This service handles user authentication and profile management.

## Features
- Register new users
- Login with JWT
- Get user profile (protected route)

## Technologies
- Node.js, Express, MongoDB, JWT, Docker

## API Routes
| Method | Endpoint | Description |
|--------|-----------|--------------|
| POST | /api/users/register | Register a new user |
| POST | /api/users/login | Login and receive a JWT |
| GET | /api/users/profile | Get profile (requires token) |

## Run
```bash
docker-compose up -d
