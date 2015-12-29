# playr-webservice

test JSON scenarios online


[![npm](https://img.shields.io/npm/dm/playr-webservice.svg?style=flat-square)](https://www.npmjs.com/package/playr-webservice)
[![Travis](https://img.shields.io/travis/eventEmitter/playr-webservice.svg?style=flat-square)](https://travis-ci.org/eventEmitter/playr-webservice)
[![node](https://img.shields.io/node/v/playr-webservice.svg?style=flat-square)](https://nodejs.org/)


### start

    node .


### Wesbite

(http://playr.127.0.0.1.xip.io:8000/)[http://playr.127.0.0.1.xip.io:8000/]


### API

Post your scenario to http://playr.127.0.0.1.xip.io:8000/play


Your request should contain the following form data fields:
- url: the base url you want the requests to be sent to (overrides the hostname & port part of your scenario script)
- scenario: JSON encoded scenario

