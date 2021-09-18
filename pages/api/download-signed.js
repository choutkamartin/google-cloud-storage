const { Storage } = require("@google-cloud/storage");

export default async function handler(req, res) {
  const keyFilePath = "utils/credentials.json";
  const bucketName = "bucket-name";
  const fileName = "filename.pdf";

  const storage = new Storage({ keyFilename: keyFilePath });

  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 1 * 30 * 1000, // When should the signed URL expire
  };

  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  res.json(url);
}
