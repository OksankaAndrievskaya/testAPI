const http = require('http');
const fs = require('fs');
const request = require('request');
const image2base64 = require('image-to-base64');
path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const downloadFileAndSave = async (fileUrl, userId) => {

  try {

    let imageLink;


    const fileLink = `avatars/${userId}.jpg`;
    if (fs.existsSync(fileLink)) {
      const data = await readFile(fileLink)
      return new Buffer(data).toString('base64');
    } else {
      imageLink = await image2base64(fileUrl);
    }

    const file = fs.createWriteStream(`avatars/${userId}.jpg`);
    const dir = 'avatars';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    } else {
      console.log("Directory already exist");
    }
    const sendReq = request.get(fileUrl);

    // verify response code
    sendReq.on('response', (response) => {
      if (response.statusCode !== 200) {
        throw `Response status was ${response.statusCode}`;
      }
      sendReq.pipe(file);
    });

    // close() is async, call cb after close completes
    file.on('finish', () => file.close());

    // check for request errors
    sendReq.on('error', (err) => {
      fs.unlink(dest);
      throw err.message;
    });

    file.on('error', (err) => { // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      throw err.message;
    });
    return imageLink;
  } catch (e) {
    throw e;
  }
};

const deleteAvatar = async (userId) => {
  try {
    const filePath = `avatars/${userId}.jpg`;
    // fs.unlinkSync(filePath);
    // return 'file was deleted'
    return fs.stat(filePath, function (err, stats) {
      console.log(stats);//here we got all information of file in stats variable

      if (err) {
        throw console.error(err);
      }

      return fs.unlink(filePath,function(err){
        if(err) throw err;
        return 'file deleted successfully';
      });
    });
  } catch (e) {
    throw e;
  }
};

const changeUsersInFile = async (users) => {
  await fs.writeFile('users.txt', '');
  await fs.writeFile('users.txt', JSON.stringify(users));
}
module.exports =  {
  downloadFileAndSave,
  deleteAvatar,
  changeUsersInFile
}
