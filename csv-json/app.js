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


//get the json
calculateAverages('result.json', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        //check the new json
        console.log(data)

        //modify new json
        // let newJson = modifyJson(data);
        
        //write newJson to the result.json file
        // jsonWriter('result.json', newJson)
    }
});