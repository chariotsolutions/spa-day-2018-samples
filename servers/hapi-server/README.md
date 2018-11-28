# SPA Day Server

A journey in node

## Quickerstart

    docker run --rm -p 8000:8000 chariotspa/server:develop

## Quickstart

    npm install
    npm run start

You can also dockerize:

    docker-compose build server
    docker-compose up server

The compose file is meant for development, not production. It's tagged
`localdev` to avoid any collisions with gitflow tags.

