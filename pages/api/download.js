const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

export default async function handler(res) {
  const keyFilePath = "utils/credentials.json";
  const bucketName = "bucket-name";
  const fileName = "filename.pdf";
  const destinationFileName = "filename.pdf";

  const storage = new Storage({ keyFilename: keyFilePath });

  storage
    .bucket(bucketName)
    .file(fileName)
    .createReadStream()
    .pipe(fs.createWriteStream(destinationFileName))
    .on("finish", () => {
      console.log("Complete");
    });
  res.end();
}
