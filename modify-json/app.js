'use strict';

const { Console } = require('console');
const fs = require('fs');

function jsonReader(filepath, cb) {
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

const newObject = {
    name: "hiiiiii"
};


function jsonWriter(filepath, jsonObject) {
    const jsonString = JSON.stringify(jsonObject,null, 2);

    fs.writeFile(filepath, jsonString, err => {
        if(err) {
            console.log(err);
        } else {
            console.log("File written succesfully!")
        }
    })
}

//get the json
jsonReader('map.json', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        //check the new json
        // console.log(data)

        //modify new json
        let newJson = modifyJson(data);
        
        //write newJson to the result.json file
        jsonWriter('result.json', newJson)
    }
});

function modifyJson(data) {
    let result = data;
    let goodStates = [];
    // result.features = []
    let states = data.features;
    // console.log(states)
    for (let i = 0; i < states.length; i++) {
        // console.log(states[i].properties.NAME, i)
        switch(states[i].properties.NAME) {
            case "Oregon":
                goodStates.push(states[i])
                continue;
            case "California":
                goodStates.push(states[i])
                continue;
            case "Nevada":
                goodStates.push(states[i])
                continue;
        }
    }
    result.features = goodStates;
    return result;
}
    

    


    // //write once read is over
    // fs.writeFile('result.json', JSON.stringify(mapJson), (err) => {
    //     if (err) throw err;
    //     console.log('Data written to file');
    // });
    // console.log('writeFile()');
 
// let data = JSON.stringify(student, null, 2);




// for (let i = 0; i < mapJson.features.length; i++) {
//     let state = mapJson.features[i].properties.NAME;
//     num++;


    // switch(state) {
    //     case "Oregon":
    //         console.log(state)
    //     case "California":
    //         console.log(state)
    //     case "Nevada":
    //         console.log(state)
    //     default:
    //         mapJson.features.splice(i,1)
    // }
// }