## The Team and Project Management  APP

The Team and Project Management Tool is an app that allows users to control teams, users, hackathons, presentations, and submissions. It provides a centralized platform for managing these aspects of projects efficiently and effectively.

## Getting Started

These instructions will help you get a copy of the The Team and Project Manager APP up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.
- Express installed and running.
- MongoDB installed and running.

### Installing

1. Clone the repository:

  `git clone  https://github.com/Walaaae/gdgHacka.git`

2. Install the dependencies:

  `npm install`

3. Configure the environment variables:
   - Update the environment variables in the `.env` file with your configuration (MONGO_URI,PORT,SECRET_JWT,JWT_EXP).

4. Start the development server:

  `npm start` 

You must be authenticated to read, create, update, or delete a model. Authentication is done via JWT. To test the api sepratly you should pass the token in the `Authorization` header as a Bearer token.

## Built With

- Node.js - JavaScript runtime.
- Express.js - Web application framework.
- MongoDB - NoSQL database for data storage.


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
