const fs = require('fs');


function calculateAverages(filepath, cb) {
    //read file async
    fs.readFile(filepath, (err, jsonString) => {
        if (err) {
            throw err;
        } else {
            try {
                const json = JSON.parse(jsonString);
                return cb && cb(null, json);
            } catch(erro) {
                console.log('error parsing json:', err)
            }
        }
    });
}

function averageResult(resultTotal, num) {
    let avg = resultTotal;
    for (const [key, value] of Object.entries(resultTotal)) {
        avg[key] = Math.round(value / num);
    }
    console.log(avg)
    return avg;
}

function createNewBudgetAvgJson(filepath, jsObject) {
    const jsonString = JSON.stringify(jsObject, null, 4);

    fs.writeFile(filepath, jsonString, err => {
        if(err) {
            console.log(err);
        } else {
            console.log("File written succesfully!")
        }
    })
}


//get the json
calculateAverages('result.json', (err, months) => {
    if(err) {
        console.log(err);
    } else {
        let resultTotal = {}

        for (const month in months) {
            //a single month in JSON
            let jsonMonth = JSON.stringify(months[month]);

            //month parsed
            objMonth = JSON.parse(jsonMonth);

            // console.log(`${month}: ${JSON.stringify(months[month])}`);
            // console.log(" ")
            // console.log(JSON.parse(jsonMonth))

            //loop through categories of month
            for (let i = 0; i < objMonth.length; i++) {
                let currentEntry = objMonth[i];

                //budget categories per month
                for (const [key, value] of Object.entries(currentEntry)) {
                    if(value == 0) continue;

                    //result doesnt have the category, insert it
                    if(!resultTotal[key]) {
                        resultTotal[key] = value;

                    //else, add the values
                    } else {
                        resultTotal[key] = (resultTotal[key] + value);
                    }
                  }
            }

          }
          createNewBudgetAvgJson('BudgetAvg', averageResult(resultTotal, objMonth.length));
    }
});