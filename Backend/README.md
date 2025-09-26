Social Media Feed - Backend
This project is the Node.js and Express backend API for a full-stack social media application. It handles user authentication, post creation, and interactions (likes and comments) and serves data to the frontend application. It uses MongoDB for the database.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (which includes npm)

MongoDB or access to a MongoDB Atlas cluster.

Installation & Setup
Clone the repository or download the source code.

Navigate into the project directory:

cd social-media-backend

Install the dependencies:

npm install

Create a .env file in the root of the project folder. This file will store your database connection string. Add the following line to it:

# For a local MongoDB instance
MONGO_URI=mongodb://localhost:27017/social-media-db

# A secret key for signing JWTs
JWT_SECRET=your_super_secret_key_that_is_long

Running the Application
Start the server:

npm run dev

The server will start on http://localhost:5000 and will attempt to connect to your MongoDB instance. You will see confirmation messages in the console.