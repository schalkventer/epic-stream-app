<!-- omit in toc -->
# 📺 Epic Stream App

![](https://www.epic-stream.co.za/meta/preview-wide.png)

<!-- omit in toc -->
## Table of Contents

- [🚀 Getting Started](#-getting-started)
  - [Production](#production)
  - [Local](#local)
  - [Data](#data)
  - [Testing](#testing)
    - [Storybook](#storybook)
    - [Automated Tests](#automated-tests)
    - [Linting](#linting)
- [Architecture](#architecture)


## 🚀 Getting Started

### Production

No manual deployment processes are required, beyond pushing commited code directly to the `master` branch.

The app is automatically deployed to Vercel at [https://epic-stream.co.za](https://epic-stream-example.vercel.app/) based on updates to the `master` branch. 

Note that `npm test` runs as a Github action automatically 
before deployment. If the tests fail, then the new deployment is automatically aborted.

### Local

1. Ensure you have the [latest version of Git](https://git-scm.com/downloads) installed.
2. Clone the repo via `git clone https://github.com/schalkventer/epic-stream-app` from your terminal.
3. Ensure you have a at a minimum the [latest LTS version of Node](https://nodejs.org/en/) installed. 
4. Run `npm install` in the root of the project.
5. Run `npm start` after the latter to start a local server at `http://localhost:3000`. 

### Data

The core data consumed by the app is deployed to a separate URL at https://epic-stream-api.netlify.app. It exposes several JSON-based endpoints in a REST manner (only supporting GET currently). 

For more details on the API and how to use it please read the documentation at [https://github.com/schalkventer/epic-stream-api](https://github.com/schalkventer/epic-stream-api).

### Testing

This project broadly adheres to the principles of [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development). This effectively means that all code is written in a manner that make it more easily testable, even if it requires additional complexity or abstractions within the code/architecture itself.

Note that this does not mean that all code needs to be tested, especially if it is trivial and/or likely to change often. However it does mean that testing is what "drives" development decisions. In other words, whether code is tested or not, the code should be written in a manner that makes it testable should you wish to do so.


#### Storybook

It recommended that all new components and containers are created and documented within [Storybook](https://storybook.js.org/) before being added to the itself app. This ensures that components can, first-and-foremost, be tested and debugged in isolation outside of the app itself. 

Please run `npm run test:storybook` in the project root to start the Storybook server at `http://localhost:6006`.

#### Automated Tests

Note that JSX files can only be tested by Storybook, all traditional `.js` files should be tested using automated tests. The two types of tests that can be used are as follows:

- [Unit tests](https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing) should be used to test deterministic JavaScript helper functions.
- [Integration tests](https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing) should be created for state-heavy React hooks.

Both of these should be created and maintained using the [Vitest testing-framework](https://vitest.dev/), and run by means of `npm test:vitest`.

#### Linting

Linting and formatting is enforced using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Most standard rules are included along with more opinionated rules from the [Airbnb JavaScript](https://airbnb.io/javascript/) and [Airbnb React](https://airbnb.io/react/) style guides.

Note that `linting` errors, while merely presented as warnings in local development, are treated as critical errors when running `npm test` in a CI/CD environment.

This means that you have a certain amount of flexibility when working locally. However, upon pushing the code to the `master` branch, you should ensure that no linting errors are present (otherwise the code will refuse to deploy).

For this reason it is recommended that you install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code to ensure that you are alerted to any linting errors as you code. If you are using a different code editor, you can find similar extension for most common editors/IDE's.

## Architecture

In accordance with the principles of [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) the code architecture is broadly split into three domains, each coinciding with one or more folders in the `/src` directory:

- Presentation: `src/components`
- Containers: `src/data`,and `src/containers`
- Services: `src/services` and `src/environments` 

While, not a traditional [Model-view-controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) architecture, it is inspired broadly inspired by a MVVM approach. The key consideration is that the "Services " ("Model") layer does not directly talk to the "View" layer, but rather mediated by a "Viewmodel" layer. 


