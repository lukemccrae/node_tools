const testFolder = './csv_budgets/';
const fs = require('fs');
const modifyJson = require('../modify-json/app.js');
let jsonBudgets = [];

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
            //use this to make the file name more JSON-friendly
            let key = file.substring(0, file.indexOf("-") - 1).replace(/\s/g, '');

            //create array of objects with keys being file names in csv_budgets
            let budgetEntry = {[key]: []};
            jsonBudgets.push(budgetEntry);


            for (let i = 0; i < jsonBudgets.length; i++) {
                // console.log(jsonBudgets[i][key])
                for (let j = 0; j < csvObj.length; j++) {
                    let current = csvObj[i];
                    if(current.Planning !== '') {
                        if(parseInt(current.field10) > 5 && !parseInt(current.Planning)) {
                            // jsonBudgets[i].key.push({[current.Planning]: current.field10})
                            
    
                        }
                    }
                }
            }

            // jsonBudgets.push(budgetEntry);
            console.log(jsonBudgets)
        })
    })
  });