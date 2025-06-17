import "./Cortes.css";

// import card cortes
import CardCortes from "../componentes/CardCortes";

import nomeimagem from "../assets/cortes/hight fade.jpg";
import nomeimagem2 from "../assets/cortes/low fade.jpg";
import nomeimagem3 from "../assets/cortes/medium fade certo.png";
import nomeimagem4 from "../assets/cortes/moicano.jpeg";
import nomeimagem5 from "../assets/cortes/mullet.webp";
import nomeimagem6 from "../assets/cortes/undercutmaior.png";
import nomeimagem7 from "../assets/cortes/corte social.jpeg";
import nomeimagem8 from "../assets/cortes/buzz cut.webp";



function Cortes() {
    return (
        <main>
            <section className="sectionFlex">
                <CardCortes 
                    image={nomeimagem}
                    title="High Fade"
                    valor="R$ 40,00"
                />
                <CardCortes 
                    image={nomeimagem2}
                    title="Low Fade"
                    valor="R$ 40,00"
                />
                <CardCortes 
                    image={nomeimagem3}
                    title="Medium Fade"
                    valor="R$ 40,00"
                />
                <CardCortes 
                    image={nomeimagem4}
                    title="Moicano"
                    valor="R$ 40,00"
                />
                <CardCortes 
                    image={nomeimagem5}
                    title="Mullet"
                    valor="R$ 40,00"
                />
                <CardCortes 
                    image={nomeimagem6}
                    title="Undercut"
                    valor="R$ 40,00"
                />
                <CardCortes 
                    image={nomeimagem7}
                    title="Social"
                    valor="R$ 40,00"
                />
                <CardCortes 
                    image={nomeimagem8}
                    title="Buzz Cut"
                    valor="R$ 40,00"
                />
            </section>
        </main>
    );
};

export default Cortes;  