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
      <ul>
        {files.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
}
