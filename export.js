#!/usr/bin/node

// resume-cli has no way of exporting with a local theme yet, export it manually
const fs = require('fs');
const RenderPDF = require('chrome-headless-render-pdf');

console.log("Exporting HTML resume to: " + process.cwd() + "/index.html");

var file = process.cwd() + '/resume.json';
fs.readFile(file, function(err, resumeJson) {
  var resumeJson;

  if (err) {
    console.log(chalk.yellow('resume.json does not exist'));
    return;
  } else {
    resumeJson = JSON.parse(resumeJson);
    resumeJson.analytics = true;
  }

  var render = require(process.cwd() + '/index').render;
  fs.writeFileSync(process.cwd() + '/index.html', render(resumeJson));
});

console.log("Exporting PDF resume to: " + process.cwd() + "/Andrew McOlash.pdf");
RenderPDF.generateSinglePdf('file://' + process.cwd() + '/index.html', 'Andrew McOlash.pdf');