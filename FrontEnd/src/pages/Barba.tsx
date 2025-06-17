import "./Barba.css";

// import card Barba
import CardCortes from "../componentes/CardCortes";

import nomeimagem9 from "../assets/barbas/barbaitaliana.jpg";
import nomeimagem10 from "../assets/barbas/alinhamento.jpg";
import nomeimagem11 from "../assets/barbas/bigode.jpg";
import nomeimagem12 from "../assets/barbas/cavanhaque com bigode.jpg";
import nomeimagem13 from "../assets/barbas/lenhador.jpg";
import nomeimagem14 from "../assets/barbas/navalha.webp";
import nomeimagem15 from "../assets/barbas/cavanhaque.jpg";
import nomeimagem16 from "../assets/barbas/barbaterapia.webp";

function Barba() {
  return (
    <main>
      <section className="sectionFlex">
        <CardCortes image={nomeimagem9} title="Italiana" valor="R$ 35,00" />
        <CardCortes image={nomeimagem10} title="Alinhamento" valor="R$ 30,00" />
        <CardCortes image={nomeimagem11} title="Bigopde" valor="R$ 35,00" />
        <CardCortes
          image={nomeimagem12}
          title="Cavanhaque com Bigode"
          valor="R$ 40,00"
        />
        <CardCortes image={nomeimagem13} title="Lenhador" valor="R$ 40,00" />
        <CardCortes image={nomeimagem14} title="Navalha" valor="R$ 35,00" />
        <CardCortes image={nomeimagem15} title="Cavanhaque" valor="R$ 35,00" />
        <CardCortes
          image={nomeimagem16}
          title="Barba Terapia"
          valor="R$ 50,00"
        />
      </section>
    </main>
  );
}

export default Barba;
