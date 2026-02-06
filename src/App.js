import './App.css';
import React, { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const consultarVista = async () => {
    if (!url) return alert("Ingresa la URL de la vista.");
    if (!apiKey) return alert("Ingresa el apiKey.");
    if (!token) return alert("Ingresa el Bearer token.");

    setLoading(true);

    try {
      const res = await fetch(url, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
      console.log(json);
    } catch (err) {
      console.error(err);
      alert("Error al consultar la vista. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2>Consultar Vista REST</h2>

      <div className="inputs-container">
        <input
          type="text"
          placeholder="URL de la vista REST"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="API Key (anon public)"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bearer token (JWT)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <button onClick={consultarVista} disabled={loading} className="btn">
        {loading ? "Cargando..." : "Consultar"}
      </button>

      <hr />

      {data.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val === null ? "" : String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}