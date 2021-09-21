import { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFiles(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>Signed URL downloads</h1>
        <p>
          Creates a signed URL to allow "public" download for a limited amount
          of time. The signed URL is then fetched, content disposition header is
          set to attachment and the file is downloaded. In addition to the
          content disposition header, anchor tag also has an download attribute.
        </p>
        <ul>
          {files.map((item) => (
            <li key={item.id}>
              <a href={`/api/download/signed/${item.name}`} download>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <h1>Direct downloads</h1>
        <p>
          Doesn't create a public signed URL, instead, downloads the file
          directly in a server to server scheme. The downloaded file could be
          server to user later, which would potentionally cause an unnecessary
          extra step.
        </p>
        <ul>
          {files.map((item) => (
            <li key={item.id}>
              <a href={`/api/download/direct/${item.name}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
