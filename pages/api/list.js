const { Storage } = require("@google-cloud/storage");

export default async function handler(req, res) {
  const keyFilePath = "utils/credentials.json";
  const bucketName = "bucket-name";

  const storage = new Storage({ keyFilename: keyFilePath });

  const [files] = await storage.bucket(bucketName).getFiles();
  res.json(files);
}
