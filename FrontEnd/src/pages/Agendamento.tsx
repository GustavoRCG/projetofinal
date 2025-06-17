
import "../pages/Agendamento.css";

function Agendamento() {
    return (
        <div className="agendamento-container">
            <header className="agendamento-header">
                <h1>Agende seu Horário</h1>
                <p>Garanta seu atendimento com nossos profissionais especializados.</p>
            </header>
            <section className="agendamento-content">
                <p>
                    Clique no botão abaixo para acessar nosso sistema de agendamento e escolher o melhor horário para você.
                </p>
                <a 
                    href="https://seusite.com/agendamento" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="agendamento-link"
                >
                    Ir para o Agendamento
                </a>
            </section>
        </div>
    );
}

export default Agendamento;