# js-framework-tachometer ![CI-master](https://github.com/andrewiggins/js-framework-tachometer/workflows/CI-master/badge.svg)

A comparison of the performance of a few popular javascript frameworks using [polymer/tachometer](https://github.com/polymer/tachometer).

## Quick Start

Clone this repository and run the following commands to get setup

```bash
npm install
npm run setup all    # Or the names of the frameworks you want to run
npm run build        # Builds all benches for frameworks setup in the previous command
```

Run the following command to run all benchmarks for all frameworks that were built in the previous commands

```bash
npm run bench        # Will take a while! Runs all benches built in the previous command
```

Start a local file server in the root of this repo to browse the html files the benchmark uses

```bash
http-server .        # https://npm.im/http-server
```

## Setup

### 1. Install global dependencies

Run `npm install` in the root of the repo to install to install global dependencies

### 2. Install dependencies to build frameworks

Run `npm run setup` to install all the dependencies of the frameworks. It requires one parameter: the frameworks you want to setup or `all` for all frameworks. Pass in a substring of the path of the framework you want to setup.

For example, running `npm run setup preact` will setup run `npm install` in the directories `frameworks/keyed/preact/` and `frameworks/keyed/preact8/`. Running `npm run setup preact/` will only setup `frameworks/keyed/preact/`.

If this command fails, you can manually run `npm install` in the directories of the frameworks you want to setup and move on to the next step.

### 3. Bundle the frameworks and build the benchmark html files

Run `npm run build` to build and bundle all the files necessary to run the benchmarks. This command runs `npm run build:prod` in each of the directories that were setup in the previous step. It then builds the HTML files to run the benchmarks in `tachometer`. It also builds an `index.html` at the repo for easier browsing to the benchmark HTML files.

You can specify only certain frameworks to build similarly to the `setup` command: `npm run build preact`. It uses the same matching algorithm as `setup`.

### 4. Run the benchmark

Run `npm run bench` to actually run the benchmark. It calls `node_modules/tachometer/bin/tach.js` with the html files for each framework per benchmark.

If you only want to bench certain frameworks, you can pass in the frameworks you want to bench similarly to `setup`: `npm run bench preact`. It uses the same matching algorithm as `setup`.

You can also specify which benchmarks you want to run using `--bench` option. It finds all benchmark html files (see the `benches` folder for the templates) that have a matching substring. For example, `npm run bench -- --bench 01` will run the `01_run1k.html` benchmark for all frameworks. `npm run bench preact -- --bench 01 --bench 02` will run the `01_run1k.html` and `02_replace1k.html` benchmark for the `preact` and `preact8` frameworks.

NOTE the `--` between `npm run bench` and `--bench`. It is necessary so that `npm` doesn't consume the `--bench` option and instead passes it to the script.

### Help

All commands support a `--help` which lists all options: `npm run setup -- --help`.

## View benches locally

After building the frameworks you want to test (i.e. running `npm run build`), you can run a static file server in the root of the repo (e.g. [`http-server .`](https://npmjs.com/package/http-server)) to browser the build output bundles and html. Use this local deployment to debug issues with the app or to profile your framework.

## Deployment

All pushes to the master branch are automatically deployed to https://js-framework-tachometer.netlify.com. You can use the URLs from that deployment to run tachometer locally: `tach https://js-framework-tachometer.netlify.com/frameworks/keyed/preact/benches/01_run1k.html https://js-framework-tachometer.netlify.com/frameworks/keyed/ivi/benches/01_run1k.html`.

## Scratch Framework

If you want to test changes to a framework or app and compare it against the current checked in version, use the directory `frameworks/keyed/scratch`. Copy the current implementation into `frameworks/keyed/scratch`, make your changes, and run the benchmark comparing `scratch` with the current implementation.
