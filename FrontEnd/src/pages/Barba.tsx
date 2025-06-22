import { useEffect, useState } from "react";
import { getBarbas, Servico } from "../service/api";
import CardCortes from "../componentes/CardCortes";
import "./Barba.css";

// Imagens locais
import nomeimagem9 from "../assets/barbas/barbaitaliana.jpg";
import nomeimagem10 from "../assets/barbas/alinhamento.jpg";
import nomeimagem11 from "../assets/barbas/bigode.jpg";
import nomeimagem12 from "../assets/barbas/cavanhaque com bigode.jpg";
import nomeimagem13 from "../assets/barbas/lenhador.jpg";
import nomeimagem14 from "../assets/barbas/navalha.webp";
import nomeimagem15 from "../assets/barbas/cavanhaque.jpg";
import nomeimagem16 from "../assets/barbas/barbaterapia.webp";

// Lista fixa para relacionar nome da API com imagem local
const imagensBarba: { [key: string]: string } = {
  Italiana: nomeimagem9,
  Alinhamento: nomeimagem10,
  Bigode: nomeimagem11,
  "Cavanhaque com Bigode": nomeimagem12,
  Lenhador: nomeimagem13,
  Navalha: nomeimagem14,
  Cavanhaque: nomeimagem15,
  "Barba Terapia": nomeimagem16,
};

function Barba() {
  const [barbas, setBarbas] = useState<Servico[]>([]);

  useEffect(() => {
    const fetchBarbas = async () => {
      try {
        const data = await getBarbas();
        setBarbas(data);
      } catch (error) {
        console.error("Erro ao buscar barbas:", error);
      }
    };

    fetchBarbas();
  }, []);

  return (
    <main>
      <section className="sectionFlex">
        {barbas.map((barba) => (
          <CardCortes
            key={barba.id}
            image={imagensBarba[barba.name] || ""}
            title={barba.name}
            valor={`R$ ${barba.preco}`}
          />
        ))}
      </section>
    </main>
  );
}

export default Barba;
