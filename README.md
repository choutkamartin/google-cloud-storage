# Google Cloud Storage API example

This example shows how to get data from Google Cloud Storage via their API. Generally, you want to use a service account to do this, assuming you don't want to let each person authorize via Google OAuth 2.0. When creating a service account, you will receive a JSON file with secrets, such as private keys. The example of the JSON is below:

```json
{
  "type": "service_account",
  "project_id": "project_id",
  "private_key_id": "private_key_id",
  "private_key": "private_key",
  "client_email": "client_email",
  "client_id": "client_id",
  "auth_uri": "auth_uri",
  "token_uri": "token_uri",
  "auth_provider_x509_cert_url": "auth_provider_x509_cert_url",
  "client_x509_cert_url": "client_x509_cert_url"
}
```

You can import the JSON file into the API routes (as already shown).

You can also use signed URLs to access some files you don't want to share publicly. Typically, these signed URLs have a short alive time until they expire.
