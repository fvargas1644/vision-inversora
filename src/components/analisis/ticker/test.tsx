'use client'

import { useState, useEffect } from "react";

const MiComponente = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((prev) => prev + 1);
    }, 5000); // 15 segundos

    return () => clearInterval(intervalo); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div>
      <h1>Contador: {contador}</h1>
    </div>
  );
};

export default MiComponente;
