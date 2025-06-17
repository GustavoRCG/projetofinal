import "./Home.css";


function Home() {
  return (
    <main className="home-main">
      <div className="home-container">
        <header className="home-header">
          <h1>Bem-vindo à Barbearia Arcanum</h1>
          <p className="subtitle">Onde tradição e modernidade se encontram</p>
        </header>

        <section className="home-about">
          <h2>Quem Somos</h2>
          <p>
            Na Barbearia Arcanum, oferecemos mais do que apenas cortes de cabelo e barba. 
            Somos uma equipe apaixonada por estilo, tradição e modernidade, dedicada a proporcionar uma experiência única para nossos clientes.
          </p>
          <p>
            Com anos de experiência, combinamos técnicas clássicas com as tendências mais atuais, 
            garantindo que você saia daqui com um visual impecável e renovado.
          </p>
        </section>

        <section className="home-values">
          <h2>Nossos Valores</h2>
          <ul>
            <li>Excelência no atendimento</li>
            <li>Compromisso com qualidade</li>
            <li>Ambiente acolhedor e estiloso</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Home;
