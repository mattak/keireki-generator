import fs from 'fs';
import pdf from 'html-pdf';
import showdown from 'showdown';
import Mustache from 'mustache';

if (process.argv.length <= 2) {
  console.log("Usage: <input_markdown> <output_html>?");
  process.exit(1);
}

if (!process.argv[2].match(/\.md$/)) {
  console.log("Error: Input file must be .md file.");
  process.exit(1);
}

var infile  = process.argv[2];
var outfile = (process.argv.length > 3) ? process.argv[3] : infile.replace(/\.md$/,".html");
var assetCssFile  = "./assets/default.css"; // TODO: handle style change
var assetHtmlFile = "./assets/default.html"; // TODO: handle style change

showdown.setFlavor('github');

// convert html
var converter       = new showdown.Converter();
var contentMarkdown = fs.readFileSync(infile, 'utf8');
var contentHtml     = converter.makeHtml(contentMarkdown);

// render
var css         = fs.readFileSync(assetCssFile, 'utf-8');
var wrapperHtml = fs.readFileSync(assetHtmlFile, 'utf-8');
var renderArguments = {
  title: "経歴書", // TODO: refer from outside
  style: css,
  body: contentHtml,
};
var html        = Mustache.render(wrapperHtml, renderArguments);

fs.writeFileSync(outfile, html);
console.log("output: %s", outfile);

