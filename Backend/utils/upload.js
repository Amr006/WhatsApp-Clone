var cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_API_KEY;
const api_secret = process.env.CLOUD_API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const uploadImage = (file , folderName) => {
  //imgage = > base64

  console.log(folderName);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { folder: folderName , resource_type: 'auto'},
      (error, result) => {
        if (result) {
          console.log(result);
          return resolve(result.secure_url);
        }
        console.log(error.message);
        return reject({ message: error.message });
      },
    );
  });
};
module.exports = (file , folderName ) => {
  console.log("folderName");
  console.log(folderName);
  console.log(file)
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { folder: folderName ,resource_type: 'auto' },
      (error, result) => {
        if (result) {
          console.log(result);
          return resolve(result.secure_url);
        }
        console.log(error.message);
        return reject({ message: error.message });
      },
    );
  });
};

module.exports.uploadMultipleImages = (images , folderName) => {
  
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base , folderName));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};