const testFolder = './csv_budgets/';
const fs = require('fs');
// const modifyJson = require('../modify-json/app.js');
let jsonBudgets = {};

//convert all files in the csv_budgets folder to array JSON objects
fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        
        //file variable is the csv file name

        //path from this file
        const csvFilePath='./csv_budgets/' + file;
        const csv=require('csvtojson')
        csv()
        .fromFile(csvFilePath)
        .then((csvObj)=>{
            //make the file name more JSON-friendly
            let key = file.substring(0, file.indexOf("-") - 1).replace(/\s/g, '');

            //create array of objects with keys being file names in csv_budgets
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

            for (let i = 0; i < csvObj.length; i++) {
                let current = csvObj[i];

                //if category of expense and amount are both truthy
                if(current.Planning && current.field10) {
                    if(current.Planning !== "Category" && current.Planning !== "method") {
                        // console.log(" ")
                        // console.log(key)
                        // console.log(current.Planning, current.field10)

                        //key cant be a number && value cant be null
                        if(!parseInt(current.Planning.replace(/\s/g, '')) && parseInt(current.field10) >= 0) {
                            let tempObj = {
                                [current.Planning.replace(/\s/g, '')]: parseInt(current.field10)
                            }
    
                            jsonBudgets[key].push(tempObj);
                        }

                    }
                }
            }

            //create json of budget names
            createNewBudgetJson('result.json', jsonBudgets)
        })
    })
  });