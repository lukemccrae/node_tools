const testFolder = './csv_budgets/';
const fs = require('fs');
let jsonBudgets = [];

//convert all files in the csv_budgets folder to JSON
fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        // console.log(file)
        //path from this file
        const csvFilePath='./csv_budgets/' + file;
        const csv=require('csvtojson')
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{

            //add json to the jsonBudgets array
            jsonBudgets.push(jsonObj);
        }).then(()=>{
            console.log(jsonBudgets.length);

            //write code to compile budget data into one json
        })
    });
  });

 
// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);