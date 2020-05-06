
# spielhalle



This repository contains several scripts and libraries being used on [spielhalle demo website](https://spielhalle.github.io/). It's currently in very early exploration stage but will contain several tests and demos for new and old web technology.

## Submodules
The packages being found in the subfolder 'packages' can be used independantly from this project but might rely on another project itself.

## Root scripts
|| command | output |
|--|--|--|
| test | npm run test | cli
| test with coverage | npm run test:coverage | packages/\*/coverage
| build | npm run build | packages/\*/build
| docs | npm run docs | packages/\*/docs

This project uses lerna so all common commands should be working too.

## Contributing

Feel free to submit PRs but please style your commits with "conventional commit" styling. The easiest way to do this run

> npx git-cz

in the root-directory instead of "git commit"
