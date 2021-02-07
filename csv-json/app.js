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
            jsonBudgets.push(jsonObj);
            

            /**˜
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */ 
        }).then(()=>{
            console.log(jsonBudgets.length)
        })
    });
  });

 
// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);