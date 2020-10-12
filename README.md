<p align="center">
    <img alt="Wunderdog" src="https://avatars1.githubusercontent.com/u/8065613?s=150&v=4" />
</p>

# w3

[![Build Status](https://travis-ci.com/wunderdogsw/w3.svg?branch=master)](https://travis-ci.com/wunderdogsw/w3)

`w3` is the front-end client of [Wunderdog's website](https://www.wunderdog.fi/). It's built using [Gatsby](https://www.gatsbyjs.com/). We manage the content of the site in [Contentful](https://www.contentful.com/).

## Getting Started

### Prerequisites

- Access to our [Contentful space](https://app.contentful.com/spaces/hkq76neqke2v/) (if you work at Wunderdog, ask Toto or Tsuikkis)
- [Node.js](https://nodejs.org/en/) (see `.nvmrc` for correct version)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

Install dependencies by running

    $ npm install

### Environment Variables

Add `.env.development` to the project root (see `.env.example` for reference).

You can get the Contentful space ID and access token by logging into Contentful and navigating to `Settings > API keys`. When developing the site locally, you might want to use Contentful's Preview API to see also the unpublished content.

### Font Files

This project uses font files that currently cannot be shared publicly outside Wunderdog. If you're working at Wunderdog, you can ask Toto for the font files. Once you have access to the font files place them to the `/fonts` directory.

If you don't have access to the font files, you can as a workaround use your browser's default fonts by setting the environment variable `GATSBY_ENABLE_FONTS` as `false`.

## Development

To start the development server, run

    $ npm start

You can access the server at [http://localhost:8000/](http://localhost:8000/). If you want to explore the site's data, you can access GraphiQL at [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql).

### Blocks

Blocks are components (e.g. headers and sections) that users can add to different pages on Contentful. You can find the block components inside `src/blocks`. Some blocks have their own content model on Contentful while others use the shared content model Component Block (`componentBlock`). These Component Block components can be found in `src/blocks/components`.

When introducing new blocks, you need to make changes at least in the following places:

1. **Contentful:** You need to add a new content model or a new `componentBlock` entry if you are adding a component block. Make also sure that users are actually able to add your new blocks in their content by checking the content field validations for `after` and `before` fields of `page`, `blogPost`, `caseStory`, and any other page content models.
2. **`src/blocks`:** Add corresponding React components to `src/blocks` (or `src/blocks/components`) and export them in `src/blocks/index.js` (or `src/blocks/components/index.js`).
3. **GraphQL queries:** Make sure that the `after` and `before` fields of `ContentfulPage`, `ContentfulBlogPost`, `ContentfulCaseStory`, and other pages are able to handle your new blocks in their GraphQL queries. Most likely you will need to check `src/components/block-list.js` and the template files (`src/templates`) to achieve this.

## Deployment

`w3` is automated and deployed to [AWS](https://aws.amazon.com/) using [Travis CI](https://travis-ci.com/github/wunderdogsw/w3) and its automatic S3 deployments. You can read more about it at [https://docs.travis-ci.com/user/deployment/s3/](https://docs.travis-ci.com/user/deployment/s3/).

The project is also connected to Gatsby Cloud to enable Contentful's Gatsby Preview extension. The Gatsby Cloud version of the site is password protected. If you work at Wunderdog, you can find the password from Gatsby Cloud's settings or from our password manager under `w3-master (Gatsby Cloud)`.

### Deployment staging mapping

- `master` branch will be deployed to production staging environment, which is [production website](https://www.wunderdog.fi/).
- `develop` branch will be deployed to [testing](https://testing.wunder.dog/)
- All other branch (usually branch with latest pushed commit) will be deployed to [preview](https://preview.wunder.dog/). This is a WIP, better staging deployment will come later.
