import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.text())
      .then((data) => setMsg(data))
      .catch((err) => {
        console.error(err);
        setMsg("Error connecting to backend ❌");
      });
  }, []);

  return (
    <div>
      <h1>{msg}</h1>
    </div>
  );
}

export default App;