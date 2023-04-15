require('dotenv').config();
const { default: mongoose } = require("mongoose");

exports.connect = async () => {
    const url = process.env.URL;
    const check = await mongoose.connect(url);
    let splittedUrl = url.split('/')
    if(check) {
        console.log(`Connected to Mongodb : db name :`+ splittedUrl[splittedUrl.length - 1]);
    } else {
        let i = 1;
        while(i<=5) {
            setTimeout(()=>{
                console.log(`Retrying to connect .... Trying for ${i}`);
                connect();
            }, 5000);
            i++;
        }
    }
}