import fs from 'fs';
import pdf from 'html-pdf';

if (process.argv.length <= 2) {
  console.log("Usage: <input_html> <output_pdf>?");
  process.exit(1);
}

if (!process.argv[2].match(/\.html$/)) {
  console.log("Error: Input file must be html file.");
  process.exit(1);
}

var infile  = process.argv[2];
var outfile = (process.argv.length > 3) ? process.argv[3] : infile.replace(/\.html$/,".pdf"); 
var html = fs.readFileSync(infile, 'utf8');
var options = {
  format: 'A4',
  "header": {
    "height": "14mm",
  },
  "footer": {
    "height": "18mm",
    "contents": {
      default: '<div style="color: #444;text-align: center">{{page}}</div>',
      // TODO: Fix to remove specific number. Not working now without following hack.
      1: '<div style="color: #444;text-align: center">{{page}}</div>',
      2: '<div style="color: #444;text-align: center">{{page}}</div>',
      3: '<div style="color: #444;text-align: center">{{page}}</div>',
      last: '<div style="text-align: center">Powered by <a href="https://github.com/mattak/keireki_generator">keireki generator</a></div>'
    },
  },
};

pdf.create(html, options)
  .toFile(outfile, (err, res) => {
    if (err) return console.log(err);
    console.log(res);
  });

console.log("output: %s", outfile);
