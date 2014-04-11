/**
 * Script to parse raw Loadster test results in JSON format, and count how many 
 * results for each URL exceed a certain threshold.
 */

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var file = argv.file;
var threshold = argv.threshold;

//
// Print usage and exit if necessary
//
if (!file || !threshold) {
    console.log("Required arguments:");
    console.log("  --file=xyas-data.json (your Loadster test data file, unzipped)");
    console.log("  --threshold=1500 (max/min cut-off time in milliseconds)");
    process.exit(1);
} else {
    readResultsFromFile(file);
}

//
// Read the file and parse the results
//
function readResultsFromFile(file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
           
        var json = JSON.parse(data);
        var results = parseResults(json);

        printResults(results);
    });
}

//
// Parses results from a JSON array
//
function parseResults(json) {
    var pages = { };

    for (var i = 0; i < json.length; i++) {
        var result = json[i];

        if (result.Type == 'http') {
            var url = result.Url;
            var duration = result.EndTime - result.StartTime;

            if (url) {
                if (!pages[url]) {
                    pages[url] = { "over": 0, "under": 0 };
                }

                if (duration > threshold) {
                    pages[url].over++;
                } else {
                    pages[url].under++;
                }
            }
        }
    }

    return pages;
}

//
// Prints the aggregated results to the console
//
function printResults(results) {
    for (var url in results) {
        var over = results[url].over;
        var under = results[url].under;
        var total = over + under;

        console.log(url + " : " + over + "/" + total + " exceeded " + threshold + " ms");
    }
}
