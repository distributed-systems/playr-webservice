# playr-webservice

test JSON scenarios online


[![npm](https://img.shields.io/npm/dm/playr-webservice.svg?style=flat-square)](https://www.npmjs.com/package/playr-webservice)
[![Travis](https://img.shields.io/travis/eventEmitter/playr-webservice.svg?style=flat-square)](https://travis-ci.org/eventEmitter/playr-webservice)
[![node](https://img.shields.io/node/v/playr-webservice.svg?style=flat-square)](https://nodejs.org/)


### start

    node .


### Wesbite

http://playr.127.0.0.1.xip.io:8000/


### API

Post your scenario to http://playr.127.0.0.1.xip.io:8000/play


Your request should contain the following form data fields:
- url: the base url you want the requests to be sent to (overrides the hostname & port part of your scenario script)
- scenario: JSON encoded scenario


The API returns an array with error messages. If there are 0 messages everthing was ok!

    {
        "messages": [
            "<span class=\"error-cyan\">HTTP Header content-length</span>: Expected value 64130 to be &lt; 200",
            "<span class=\"error-cyan\">data.length</span>: Expected value 60 to be &gt; 5000000"
        ]
    }


CSS Classes that may be used by the error messages:

- error-white
- error-grey
- error-blue
- error-cyan
- error-green
- error-magenta
- error-red
- error-yellow
- error-bold
- error-italic
- error-underline
- error-inverse