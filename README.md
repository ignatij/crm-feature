# CRM Feature application

Designed as a monorepo with the help of Yarn workspaces.
Consists of the following workspaces:

- `app`: The Node.js server application developed in Express
- `ui`: The frontend application, built with Svelte

## Prerequisites

- Yarn Berry (v4)
- Node v20
- Docker

## Development environment setup

All commands are executed from the parent (root) directory:

- Run `yarn` to install packages
- Run `yarn start-local-db` to start the local PostgreSQL database
- Create `.env` files in `app` and `ui` workspaces (you can copy/paste from the `.env.sample` to use the default values)
- Run `yarn app:start` to start the main server application. Running this command will:
  - Create a new empty database, create the table "orders" and fill it with the content of the csv file
  - Start the backend server on the provided port in the .env file
- Open a new terminal in the root and directory and run `yarn ui:start` to start the frontend application in preview mode
- Open [preview](http://localhost:4173/)

## Creating Docker images

To create the Docker images of the three applications, run the following commands:

- `docker build -t app -f docker/App.Dockerfile .`
- `docker build -t ui -f docker/Ui.Dockerfile .`

To start the three application run the following commands:

- Create a dedicated Docker network: `docker network create crm-feature-app`
- Add the DB container to the network: `docker network connect crm-feature-app app-postgres-1`
- Start the containers on the same network:
  - `docker run -d -p 8000:8000 -e DB_HOST=host.docker.internal --network crm-feature-app app`
  - `docker run -d -p 8080:8080 --network crm-feature-app ui`
- Open the [app](http://localhost:8080/)
