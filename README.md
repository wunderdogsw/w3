[![Build Status](https://travis-ci.com/wunderdogsw/w3.svg?branch=master)](https://travis-ci.com/wunderdogsw/w3)

# w3

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (see `.nvmrc` for correct version)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

Install dependencies by running

    $ npm install

### Environment Variables

Add `.env.development` to the project root (see `.env.example` for reference).

You can get the Contentful space ID and access token by logging into Contentful and navigating to `Settings > API keys`. When developing the site locally, you might want to use Contentful's Preview API to see also the unpublished content.

### Font Files

This project uses font files that currently cannot be shared publicly outside Wunderdog. If you're working at Wunderdog, you can ask Toto for the font files.

## Useful Commands

To start the development server, run

    $ npm start

You can access the server at [http://localhost:8000/](http://localhost:8000/). If you want to explore the site's data, you can access GraphiQL at [http://localhost:8000/___graphql](http://localhost:8000/___graphql).

