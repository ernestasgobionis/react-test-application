## React app

### Project Structure

```
.
├── /dist/                      # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /public/                    # Static files which are copied into the /build/public folder
├── /src/                       # The source code of the application
│   │── /actions/               # Redux actions
│   │── /api/                   # Application API related files
│   │── /components/            # React Components
│   │── /redux/                 # Redux reducers, actions and sagas
│   │── /routes/                # Routes
│   │── /utils/                 # Frontend utils
│   ├── /styles/                # Styles
│   ├── /app.tsx                # Root component with core layout and React Router
│   └── /index.tsx              # App entry point and main render
├── /test/                      # Test related files
├── /tools/                     # Build automation scripts and utilities
├── /tools/                     # Build automation scripts and utilities
├── package.json                # The list of 3rd party libraries and utilities
└── yarn.lock                   # Fixed versions of all the dependencies
```

### Quick Start

#### 1. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 2. Run `yarn start`

> [http://localhost:3000/](http://localhost:3000/) — Default application URL

NOTE: In Analysis page use some of the provided example URLs, since not all URLs work because of CORS.

```
https://jsonplaceholder.typicode.com/guide.html

https://basarat.gitbook.io/typescript/
```

### How to Build, Test

If you need just to build the app (without running a dev server), simply run:

```shell
$ yarn run build
```

or, for a production build:

```shell
$ yarn run build-production
```

And then just use Express, a CLI server like [http-server](https://github.com/http-party/http-server) or any other server to serve the build.

To check the source code for syntax errors and potential issues run:

```shell
$ yarn run lint
```

To launch unit tests:

```shell
$ yarn run test          # Run unit tests with Jest
$ yarn run test:watch    # Launch unit test runner and start watching for changes
```
