const { Storage } = require("@google-cloud/storage");
const stream = require("stream");
const { promisify } = require("util");
import fetch from "node-fetch";

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

  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 1 * 30 * 1000, // When should the signed URL expire
  };

  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  const pipeline = promisify(stream.pipeline);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  await pipeline(response.body, res);
}
