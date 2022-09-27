import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Navigate.css";

export const Navigate = () => {
  const [rota, setRota] = useState("");

  const goTo = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(rota);
  }, [rota]);

  return (
    <div className="navegacao">
      <h1>Informe a URL desejada</h1>
      <form onSubmit={goTo}>
        <input
          className="form-control"
          type="text"
          name="url"
          placeholder="Informe a URL"
          onChange={(e) => setRota(e.target.value)}
        />
        <Link to={`/${rota}`} className="btn" type="submit">
          Enviar
        </Link>
      </form>
    </div>
  );
};
