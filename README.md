loadster-contrib
================

Extra scripts, utils, and goodies for working with Loadster and load testing in general.

Prerequisites
-------------
Any .js script requires [NodeJS](http://nodejs.org/) and [NPM](https://www.npmjs.org/)
to be installed on your system. These scripts are intended to be run from the command line.

scripts/js/response-time-threshold.js
-------------------------------------

Parse a Loadster test data file and count exactly how many results of each URL exceed a 
particular threshold.

```bash
$ npm install minimist
$ node scripts/js/response-time-threshold.js --file=samples/xmpl-data.json --threshold=1500

http://www.circa2015.com/ : 1/17 exceeded 1500 ms
http://www.circa2015.com/transportation.html?___store=default : 2/17 exceeded 1500 ms
http://www.circa2015.com/transportation/hoverboard.html : 3/17 exceeded 1500 ms
http://www.circa2015.com/catalog/product/gallery/id/2/image/3/ : 0/17 exceeded 1500 ms
```

Licensing
---------
Loadster is a commercial product, but our SDK is available under the [Apache License v2](LICENSE).
