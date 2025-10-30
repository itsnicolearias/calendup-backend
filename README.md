# CalendUp Backend API

A backend API for a scheduling application, built with Node.js, TypeScript, Express, Sequelize, and PostgreSQL.

## Features

- User authentication with JWT
- Social login with Google and Facebook
- Appointment scheduling and management
- Professional profiles and settings
- Customer reviews and ratings
- Subscription plans for professionals
- Email notifications with Nodemailer
- AWS S3 integration for file uploads
- **ESLint for code quality**

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT + bcrypt, Passport for social login
- **Cloud Storage**: AWS S3
- **Email**: Nodemailer
- **Code Quality**: ESLint

## Project Structure

```
src/
├── config/       # Configuration files
├── interfaces/   # TypeScript interfaces and types
├── libs/         # Libraries and external services
├── middlewares/  # Custom middleware
├── migrations/   # Database migrations
├── models/       # Sequelize models
├── modules/      # Business logic modules
├── routes/       # API routes
├── templates/    # Email templates
├── utils/        # Utility functions
├── app.ts        # Express app setup
└── index.ts      # Server entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (you can copy `.env.example` if it exists) and configure your environment variables.

4. Run migrations:
```bash
npm run migrations:run
```

5. Start the development server:
```bash
npm run dev
```

## Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript for production
- `npm start` - Start production server

### Database
- `npm run migrations:run` - Run all pending migrations
- `npm run migrations:delete` - Undo all migrations
- `npm run migrations:revert` - Undo last migration

### Code Quality
- `npm run lint` - Run ESLint and auto-fix issues

## API Documentation

The API is self-documented and follows RESTful principles. It is recommended to use a tool like Postman or Insomnia to interact with the API. The base URL for the API is `/api`.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/verify-account` - Verify user account
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset user password
- `GET /api/auth/google` - Initiate Google login
- `GET /api/auth/google/callback` - Google login callback
- `GET /api/auth/facebook` - Initiate Facebook login
- `GET /api/auth/facebook/callback` - Facebook login callback

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create a new appointment
- `PUT /api/appointments/:id` - Update an appointment
- `DELETE /api/appointments/:id` - Delete an appointment
- `GET /api/appointments/from-user` - Get appointments for the logged in user
- `PUT /api/appointments/from-user` - Update an appointment for the logged in user

### Appointment Types
- `GET /api/appointment-types` - Get all appointment types
- `GET /api/appointment-types/:id` - Get appointment type by ID
- `POST /api/appointment-types` - Create a new appointment type
- `PUT /api/appointment-types/:id` - Update an appointment type
- `DELETE /api/appointment-types/:id` - Delete an appointment type

### Professionals
- `GET /api/professionals` - Get all professionals
- `GET /api/professionals/:id` - Get professional by ID
- `GET /api/professionals/:id/available-dates` - Get available dates for a professional

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

### Settings
- `GET /api/settings/profile` - Get user profile
- `PUT /api/settings/profile` - Update user profile
- `POST /api/settings/change-password` - Change user password

## Database Schema

The database schema is defined using Sequelize models. The main models are:

- **User**: Stores user information, including authentication details.
- **Profile**: Stores user profile information, such as name, photo, and professional details.
- **Appointment**: Stores information about scheduled appointments.
- **AppointmentType**: Stores different types of appointments that can be booked.
- **Review**: Stores reviews and ratings for professionals.
- **Plan**: Stores subscription plan details.
- **Subscription**: Stores user subscription information.

## Environment Variables

It is recommended to create a `.env.example` file with the following variables:

### Required
- `NODE_ENV` - Environment (development/test/production)
- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens

### Social Login
- `GOOGLE_CLIENT_ID` - Google Client ID for OAuth
- `GOOGLE_CLIENT_SECRET` - Google Client Secret for OAuth
- `FACEBOOK_APP_ID` - Facebook App ID for OAuth
- `FACEBOOK_APP_SECRET` - Facebook App Secret for OAuth

### AWS S3
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_S3_BUCKET` - S3 bucket name

### Email
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port
- `EMAIL_USER` - Email username
- `EMAIL_PASS` - Email password
- `EMAIL_FROM` - From email address

## Code Quality

The project follows strict code quality standards:
- **TypeScript**: Full type safety with interfaces and types
- **ESLint**: Enforces coding standards and best practices
- **Modular Architecture**: Separation of concerns

## Architecture Decisions

The project is built with a modular architecture, where each feature is separated into its own module. This makes the codebase easier to maintain and scale. The use of Sequelize as an ORM allows for easy interaction with the database and provides a layer of abstraction. The use of Zod for validation ensures that all incoming data is valid before it is processed.

## License

ISC
