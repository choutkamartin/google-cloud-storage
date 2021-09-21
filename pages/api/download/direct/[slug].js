const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

export default async function handler(req, res) {
  const credentials = {
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  };

  const storage = new Storage({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: credentials,
  });

  const bucketName = process.env.GOOGLE_BUCKET_NAME;
  const fileName = req.query.slug;
  const destinationFileName = req.query.slug;

  const options = {
    destination: destinationFileName,
  };

  //   Use either built in download method
  await storage.bucket(bucketName).file(fileName).download(options);

  //   Or use built in createReadStream method
  storage
    .bucket(bucketName)
    .file(fileName)
    .createReadStream()
    .pipe(fs.createWriteStream(destinationFileName))
    .on("finish", () => {
      console.log("Download complete");
    });
  res.end();
}
