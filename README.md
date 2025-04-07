# Deepak Pandey's Portfolio Website

A full-stack personal portfolio website showcasing my projects, achievements, blogs, and skills. Built with modern web technologies to provide a seamless user experience.

## Features

- **Modern Design:** Clean, responsive interface designed with TailwindCSS
- **Full-Stack Architecture:** Frontend built with React.js, backend with Node.js and Express
- **Admin Dashboard:** Content management system for easy updates
- **Dynamic Content:** Projects, hackathons, blogs, and more
- **Secure Authentication:** JWT authentication for admin access

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/deepakpandey-tis/portfolio.git
   cd portfolio
   ```

2. Install dependencies for both client and server:
   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Environment Variables:
   
   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d
   ```

   Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development servers:
   
   Server:
   ```
   cd server
   npm run dev
   ```
   
   Client:
   ```
   cd client
   npm start
   ```

## Project Structure

```
portfolio/
├── client/                # Frontend React application
│   ├── public/            # Static files
│   └── src/               # React source files
│       ├── components/    # Reusable components
│       ├── context/       # React context (auth, theme)
│       ├── pages/         # Page components
│       │   └── admin/     # Admin dashboard pages
│       ├── services/      # API services
│       └── App.tsx        # Main app component
│
└── server/                # Backend Node.js application
    ├── src/               # Source files
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Request handlers
    │   ├── middleware/    # Custom middleware
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   └── index.ts       # Entry point
    └── package.json
```

## Admin Features

The admin dashboard provides the following functionality:
- Projects management (add, edit, delete)
- Hackathons management
- Blog posts management
- Profile settings

## Deployment

### Vercel Deployment

This project can be easily deployed to Vercel with the included configuration:

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. For production deployment:
   ```
   vercel --prod
   ```

### Environment Variables on Vercel

Configure the following environment variables in your Vercel project settings:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: Token expiration time (e.g., "30d")
- `NODE_ENV`: Set to "production"

## Alternative Deployment Options

### Heroku

1. Install Heroku CLI and login
2. Create a new Heroku app
3. Add the MongoDB add-on or configure environment variables for your external MongoDB
4. Deploy using Git: `git push heroku main`

### Digital Ocean / AWS / Azure

For cloud providers:
1. Set up a virtual machine
2. Install Node.js and MongoDB
3. Clone the repository
4. Configure environment variables
5. Use PM2 or similar to keep the application running
6. Set up Nginx as a reverse proxy

## Author

Deepak Pandey - Computer Science Engineering Student at Chandigarh University (2023-2027)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 