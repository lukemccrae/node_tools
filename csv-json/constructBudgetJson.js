const testFolder = './csv_budgets/';
const fs = require('fs');
let jsonBudgets = {};

//make keys all lowercase
function objLowerCase(obj) {
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newobj={}
    while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
}

//convert all files in the csv_budgets folder to a single JSON
fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        //file variable is the csv file name

        //path from this file
        const csvFilePath='./csv_budgets/' + file;
        const csv=require('csvtojson')
        csv()
        .fromFile(csvFilePath)
        .then((csvObj)=>{
            //csv files are downloaded with a dash and a space
            //make the file name more JSON-friendly
            let key = file.substring(0, file.indexOf("-") - 1).replace(/\s/g, '');

            //create array of objects with keys being modified file names in csv_budgets
            let budgetEntry = {[key]: {}};
            jsonBudgets[key] = [];


            function createNewBudgetJson(filepath, jsObject) {
                const jsonString = JSON.stringify(jsObject, null, 4);
            
                fs.writeFile(filepath, jsonString, err => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("File written succesfully!")
                    }
                })
            }

            //loop through all csv entries
            for (let i = 0; i < csvObj.length; i++) {
                let current = csvObj[i];

                //if category of expense and amount values are both truthy
                if(current.Planning && current.field10) {

                    //remove categories that are missing relevant values
                    if(current.Planning !== "Category" && current.Planning !== "method") {
                        // console.log(" ")
                        // console.log(key)
                        // console.log(current.Planning, current.field10)

                        //key cant be a number && value cant be less than zero (or NaN)
                        if(!parseInt(current.Planning.replace(/\s/g, '')) && parseInt(current.field10) >= 0) {
                            let tempObj = {
                                [current.Planning.replace(/\s/g, '')]: parseInt(current.field10)
                            }
                            // console.log(objLowerCase(tempObj))
                            //push objects to jsonBudgets with lowercase keys
                            jsonBudgets[key].push(objLowerCase(tempObj));
                        }

                    }
                }
            }

            //create json of budget names
            //this is still in the forEach loop so this code runs many times, but the end result is correct
            createNewBudgetJson('result.json', jsonBudgets)
        })
    })
  });