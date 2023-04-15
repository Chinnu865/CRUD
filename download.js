// https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg
// https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

exports.download = async (url) => {
    let fileType = path.extname(url).slice(1);
    const { default: fetch } = await import('node-fetch');

    const filename = uuidv4() + '.' + fileType;
    const filePath = fs.createWriteStream(`./downloads/${filename}`);

  try {
    const res = await fetch(url);
    res.body.pipe(filePath);
    filePath.on('finish', () => {
      console.log('done writing file');
    });
    filePath.on('error', () => {
      console.log('error writing file');
    });
  } catch (err) {
    console.error(err);
  }
}
