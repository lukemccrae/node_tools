const testFolder = './csv_budgets/';
const fs = require('fs');
// const modifyJson = require('../modify-json/app.js');
let jsonBudgets = [];

//convert all files in the csv_budgets folder to JSON
fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        
        //file variable is the csv file name

        //path from this file
        const csvFilePath='./csv_budgets/' + file;
        const csv=require('csvtojson')
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{

            //add json to the jsonBudgets array
            // jsonBudgets.push(jsonObj);
        }).then(()=>{
            let key = file.substring(0, file.indexOf("-") - 1).replace(/\s/g, '');
            let budgetEntry = {[key]: ''};
            jsonBudgets.push(budgetEntry);
            console.log("hi")
            //write code to compile budget data into one json
            let names = {};
            for (let i = 0; i < jsonBudgets.length; i++) {
                let current =  jsonBudgets[i];
                for (let j = 0; j < current.length; j++) {
                    if(current[j].Planning) {
                        if(parseInt(current[j].field10) > 5 && !parseInt(current[j].Planning)) {
                            // console.log(current[j].Planning, current[j].field10);
                        }
                    }
                }
            }
        })
    }).then(() =>{
        console.log("whaaat")
    });
  });

 
// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);