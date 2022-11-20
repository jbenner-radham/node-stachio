stachio
=======
[![npm](https://img.shields.io/npm/v/stachio.svg?style=flat-square)](https://www.npmjs.com/package/stachio)
[![node](https://img.shields.io/node/v/stachio.svg?style=flat-square)](https://nodejs.org/)
[![license](https://img.shields.io/github/license/jbenner-radham/node-stachio.svg?style=flat-square)](LICENSE)

Render mustachio'd (Handlebars) templates into a static site.

Install
-------
```sh-session
npm install stachio
```

Usage
-----

### API
```js
import stachio from 'stachio';

const context = { greeting: 'hello' };
const cwd = process.cwd();
const destination = 'dist';
const options = { context, cwd, destination };

stachio(options);
```

### CLI
```sh-session
$ stachio --help

  Render mustachio'd (Handlebars) templates into a static site.

  Usage
      $ stachio [$SOURCE_DIRECTORY=.] [$OUTPUT_DIRECTORY=dist]

  Options
      --help, -h       Display this message.
      --version, -v    Display the application version.
```

Testing
-------
```sh-session
npm test
```

See Also
--------
- [readme-md-cli](https://www.npmjs.com/package/readme-md-cli)

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.
