import './App.css';
import React, { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");   // NUEVO
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
    <div style={{ padding: 20 }}>
      <h2>Consultar Vista REST (Supabase)</h2>

      <input
        type="text"
        placeholder="URL de la vista REST"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="text"
        placeholder="API Key (anon public)"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="text"
        placeholder="Bearer token (JWT)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={consultarVista} disabled={loading}>
        {loading ? "Cargando..." : "Consultar"}
      </button>

      <hr />

      {data.length > 0 && (
        <table border="1" cellPadding="5" style={{ width: "100%", marginTop: 10 }}>
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
      )}
    </div>
  );
}