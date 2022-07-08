const spawn = require("child_process").spawn

const pythonProcess = spawn("python3", ["pp.py"]);
pythonProcess.stdout.on("data", (data) => {
    // Do something with data returned from python script
    // console.log(`Node JS got Data ${data}`)
    // console.log(`Type is ${typof data}`)}
    //convert string to Json
    mystr = data.toString();
    myjson = JSON.parse(mystr);
    //create Endpoint with filtered Data
})