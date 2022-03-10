# Survey testing
  
## Installation and Setup Instructions

You will need to first download and install [Docker](https://www.docker.com)

1.  Fork/Clone the repo
2.  Run `docker-compose up` to start three containers:
    - the MongoDB database container
    - the Node.js app container
    - the ReactJS app container
3.  Web app is accessible at `http://localhost` and `http://locahost:8080` for API server.

## Techstack

- [Docker](https://www.docker.com/) as the container service to isolate the environment.
- [Node.js](https://nodejs.org/en/) (Long-Term-Support Version) as the run-time environment to run JavaScript.
- [Express.js](https://expressjs.com/) as the server framework / controller layer
- [MongoDB](https://www.mongodb.com/) as the database layer
- [Mongoose](https://mongoosejs.com/) as the "ODM" / model layer
- [ReactJS](https://reactjs.org/) as the web app layer