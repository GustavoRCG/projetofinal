import "../pages/Combos.css";

import CardCortes from "../componentes/CardCortes";


import nomeimagem from "../assets/barbas/barbaterapia.webp";
import nomeimagem2 from "../assets/cortes/low fade.jpg";
import nomeimagem3 from "../assets/cortes/medium fade certo.png";
import nomeimagem4 from "../assets/cortes/moicano.jpeg";



function Cortes() {
    return (
        <main>
            <section className="sectionFlex">
                <CardCortes 
                    image={nomeimagem}
                    title="Sobrancelha+Corte"
                    valor="R$ 50,00"
                />
                <CardCortes 
                    image={nomeimagem2}
                    title="Barbaterapia+Corte"
                    valor="R$ 75,00"
                />
                <CardCortes 
                    image={nomeimagem3}
                    title="Barbaterapia+Sobrancelha"
                    valor="R$ 60,00"
                />
                <CardCortes 
                    image={nomeimagem4}
                    title="Corte+Sobrancelha+Barbaterapia"
                    valor="R$ 90,00"
                />
            </section>
        </main>
    );
};

export default Cortes;  