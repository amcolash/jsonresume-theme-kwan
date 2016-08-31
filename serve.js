#!/usr/bin/node
//
// This script will run a local development server. This is useful when
// developing the theme.
//
// Usage:
// `serve.js` to use the default JSONResume example
// `serve.js <filename>` to open a particular resume file

var http = require("http");
var theme = require("./index.js");
var fs = require('fs');
var args = require('optimist').argv;
var childProcess = require('child_process');

var port = 8888;
http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.end(render());

    // Whenever page is requested also export a copy to index.html
    runScript('./export.js', function (err) {
        if (err) throw err;
    });
}).listen(port);

console.log("Preview: http://localhost:8888/");
console.log("Serving..");

function render() {
    try {
      var resume = args._.length? JSON.parse(fs.readFileSync(args._[0], 'utf8')) : require("resume-schema").resumeJson;
        return theme.render(resume);
    } catch (e) {
        console.log(e.message);
        return "";
    }
}

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}
