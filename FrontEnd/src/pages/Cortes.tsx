import { useEffect, useState } from "react";
import { getCortes, Servico } from "../service/api";
import CardCortes from "../componentes/CardCortes";
import "./Cortes.css";

import nomeimagem from "../assets/cortes/hight fade.jpg";
import nomeimagem2 from "../assets/cortes/low fade.jpg";
import nomeimagem3 from "../assets/cortes/medium fade certo.png";
import nomeimagem4 from "../assets/cortes/moicano.jpeg";
import nomeimagem5 from "../assets/cortes/mullet.webp";
import nomeimagem6 from "../assets/cortes/undercutmaior.png";
import nomeimagem7 from "../assets/cortes/corte social.jpeg";
import nomeimagem8 from "../assets/cortes/buzz cut.webp";

const imagensCorte: { [key: string]: string } = {
  "High Fade": nomeimagem,
  "Low Fade": nomeimagem2,
  "Medium Fade": nomeimagem3,
  Moicano: nomeimagem4,
  Mullet: nomeimagem5,
  Undercut: nomeimagem6,
  Social: nomeimagem7,
  "Buzz Cut": nomeimagem8,
};

function Cortes() {
  const [cortes, setCortes] = useState<Servico[]>([]);

  useEffect(() => {
    const fetchCortes = async () => {
      try {
        const data = await getCortes();
        setCortes(data);
      } catch (error) {
        console.error("Erro ao buscar cortes:", error);
      }
    };

    fetchCortes();
  }, []);

  return (
    <main>
      <section className="sectionFlex">
        {cortes.map((corte) => (
          <CardCortes
            key={corte.id}
            image={imagensCorte[corte.name] || ""}
            title={corte.name}
            valor={`R$ ${corte.preco}`}
          />
        ))}
      </section>
    </main>
  );
}

export default Cortes;
