(function() {
    'use strict';

    let Class           = require('ee-class');
    let type            = require('ee-types');
    let log             = require('ee-log');
    let path            = require('path');
    let Webservice      = require('ee-webservice');
    let BasicAuth       = require('em-basicauth');
    let WebFiles        = require('em-webfiles');
    let FSLoader        = require('em-webfiles-loader-filesystem');
    let FormData        = require('em-formdata-collector')
    let Playr           = require('playr');
    let JSONScenario    = require('playr-json-scenario');





    let colors = {
          37: 'white'
        , 90: 'grey'
        , 34: 'blue'
        , 36: 'cyan'
        , 32: 'green'
        , 35: 'magenta'
        , 31: 'red'
        , 33: 'yellow'
        , 1: 'bold'
        , 3: 'italic'
        , 4: 'underline'
        , 7: 'inverse'
    };



    

    module.exports = new Class({

        init: function(options) {
            
            // start the webservice
            this.service = new Webservice({
                  port:         8000
                , interface:    Webservice.IF_ANY
            });


            /*this.service.use(new BasicAuth({
                users: {
                    joinbox: '1customize4system'
                }
            }));*/


            // formdata decoder
            this.service.use(new FormData());

            // WebFiles
            this.files = new WebFiles();


            // loader
            this.loader = new FSLoader({
                path: path.join(__dirname, '../www')
            });


            // load files
            this.loader.on('load', (err) => {
                if (err) log(err);
                else this.files.use(this.loader);
            });


            this.files.addDirectoryIndex('index.html');


            this.service.use(this.files);




            this.service.use(this.handleRequest.bind(this));


            this.service.listen();
        }





        , handleRequest: function(request, response, next) {
            if (request.pathname === '/play' && request.method === 'post') {

                // nice, we got a playr item
                request.getForm((data) => {
                    let scenario;

                    try {
                        scenario = JSON.parse(data.scenario);
                    } catch (e) {
                        return response.send(400, 'Failedd to parse scenario: '+e);
                    }


                    this.play(data.url, scenario, response);
                });

            }
            else next();
        }




        , play: function(url, scenario, response) {
            let playbook = new Playr();
            let messages = [];

            playbook.run(new JSONScenario({
                  data: scenario
                , url: url
                , log: true
            }));

            let validator = new JSONScenario.ResponseValidator();

            // hijack result
            validator.resultHook = (msgs) => {
                messages = messages.concat(msgs);
            }


            playbook.use(validator);


            playbook.play().then(() => {
                log.success('playbook finished ...');

                messages = messages.map((msg) => {

                    msg = msg.replace(/\>/gi, '&gt;');
                    msg = msg.replace(/\</gi, '&lt;');

                    // replace colors
                    Object.keys(colors).forEach((code) => {
                        msg = msg.replace(new RegExp(`\u001b\\[${code}m`, 'gi'), `<span class="error-${colors[code]}">`);
                    });

                    msg = msg.replace(new RegExp(`\u001b\\[39m`, 'gi'), `</span>`);
                    msg = msg.replace(new RegExp(`\u001b\\[22m`, 'gi'), `</span>`);
                    msg = msg.replace(new RegExp(`\u001b\\[24m`, 'gi'), `</span>`);
                    msg = msg.replace(new RegExp(`\u001b\\[27m`, 'gi'), `</span>`);

                    return msg;
                });

                response.send(200, JSON.stringify({messages: messages}), {'Content-Type': 'Application/JSON'});
            }).catch(log);
        }
    });
})();
