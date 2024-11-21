# TODO App Backend

This repository demonstrates the backend for a simple task management application built with **Express.js** and **Prisma**. It integrates a database for persistent task data storage and supports the frontend's functionality for task creation, update, and deletion.

## What's been Done

- **Task CRUD Operations**:
  - Create, update, and delete tasks.
  - Tasks include a `title`, `color`, and `completed` status.
- **Database Integration**:
  - Integrated with a **Prisma**-based database for persistent storage.
- **CORS Configuration**:
  - Allowed CORS for seamless integration with the frontend.

## Environment Setup

- **Node Version**: v20.10.0
- **Database**: MySQL

## Database Setup

To set up the database, follow these steps:

### 1. Install Dependencies

Clone the backend repository and install the necessary dependencies.

git clone <repository-url>
cd <repository-directory>
npm install

### 2.Install MySQL Locally

### 3.Configure Environment Variables

`DATABASE_URL=mysql://USER:PASSWORD@localhost:3306/TODO_APP?schema=public`
`PORT=5050`

### 4. Run Prisma Migrations

`npx prisma migrate dev --name init`

### 5. Start the Server

`npm run dev`
