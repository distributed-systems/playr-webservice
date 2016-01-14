# playr-webservice

Test your JSON Test Scnarios online!

Create your scenarios using the [chrome extension](https://github.com/distributed-systems/recordr-chrome-extension).


[![npm](https://img.shields.io/npm/dm/playr-webservice.svg?style=flat-square)](https://www.npmjs.com/package/playr-webservice)
[![Travis](https://img.shields.io/travis/distributed-systems/playr-webservice.svg?style=flat-square)](https://travis-ci.org/eventEmitter/playr-webservice)
[![node](https://img.shields.io/node/v/playr-webservice.svg?style=flat-square)](https://nodejs.org/)




## Installation

You need node & npm installed. You may either install the server into a folder or globally.

Local folder installation:

    git clone https://github.com/distributed-systems/playr-webservice.git
    npm i

Global installation

    npm i -g playr-webservice






## Start

The server listens by default on the port 7000. You may specifiy a custom port using the port parameter

Start from within the folder

    node . [--port=80]

Start the global server
    
    playr [--port=80]




## Use

Visit the following website, change the port if you configured it

[http://playr.127.0.0.1.xip.io:7000/](http://playr.127.0.0.1.xip.io:7000/)