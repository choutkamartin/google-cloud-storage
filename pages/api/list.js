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

  const [files] = await storage.bucket(bucketName).getFiles();
  res.json(files);
}
