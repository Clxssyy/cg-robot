# Three.js / WebGL Robot 🤖

A simple robot made with Three.js

## Features

- Use `c` to change the robots color
- Use `j` to jump with the robot
- Use `s` to spin the robot

## Usage

### Docker Compose
- Have [Docker](https://www.docker.com/products/docker-desktop/) desktop open
- Run `docker compose up` within the project directory
- Go to `localhost:5173` and enjoy the robot

### Docker
- Have [Docker](https://www.docker.com/products/docker-desktop/) desktop open
- Build the Docker image using `docker build . -t image-name`
- Run the Docker container using `docker run -p 5173:5173/tcp --rm image-name`
- Go to `localhost:5173` and enjoy the robot

### Vite

- Have node and npm installed
- Install the project dependencies using `npm install`
- Run `npx vite`
- Go to `localhost:5173` and enjoy the robot
