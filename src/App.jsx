import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeTab, setActiveTab] = useState('dossie');

  useEffect(() => {
    // Checa se o usuário já viu o tutorial
    const tutorialVisto = localStorage.getItem('tutorial_visto');
    if (!tutorialVisto) {
      setShowTutorial(true);
    }
  }, []);

  const closeTutorial = () => {
    localStorage.setItem('tutorial_visto', 'true');
    setShowTutorial(false);
  };

  return (
    <div className="app-container">
      {/* Pop-up Overlay (Glassmorphism) */}
      {showTutorial && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2><span style={{color: '#ff3333'}}>●</span> Bem-vindo Detetive</h2>
            <p>Você foi contratado para reabrir o caso frio de Araçatins: <strong>O Desaparecimento de Elisa Drummond</strong>, ocorrido em 2009.</p>
            
            <h3>Sua Interface de Trabalho</h3>
            <ul>
              <li><strong>Arquivos Físicos:</strong> Você precisará dos documentos impressos para começar. Eles contêm pistas de segurança vitais.</li>
              <li><strong>Sistemas Interativos:</strong> Este hub conectará você aos servidores da Polícia e ao Laboratório de DNA.</li>
              <li><strong>Consequências:</strong> Você não terá "Game Over". Respostas erradas te aprofundarão nos álibis falsos. Fique atento.</li>
            </ul>
            
            <div className="action-row">
              <a href="/arquivos-imprimir" className="btn-primary">Baixar Arquivos Confidenciais</a>
              <button onClick={closeTutorial} className="btn-ghost">Iniciar Investigação</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">C</div>
          <div className="brand-text">
            <h1>Carvalho</h1>
            <p>INVESTIGAÇÕES LTDA.</p>
          </div>
        </div>

        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === 'dossie' ? 'active' : ''}`} onClick={() => setActiveTab('dossie')}>
            📁 Dossiê da Vítima
          </div>
          <div className={`nav-item ${activeTab === 'suspeitos' ? 'active' : ''}`} onClick={() => setActiveTab('suspeitos')}>
            👥 Fichas de Suspeitos
          </div>
          <div className={`nav-item ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
            ⏱️ Linha do Tempo
          </div>
        </nav>

        <div className="system-status">
          <div className="pulse-dot"></div>
          SECURE CONNECTION
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header>
          <div className="header-title">
            <h2>Caso <strong>2009-447</strong></h2>
          </div>
          <div className="header-meta">
            ÚLTIMA ATUALIZAÇÃO<br/>
            12.11.2024 - 14:00 UTC
          </div>
        </header>
        
        <div className="dashboard-grid">
          {activeTab === 'dossie' && (
            <div className="glass-panel" style={{gridColumn: '1 / -1', borderLeft: '4px solid var(--primary-glow)'}}>
              <h3 className="panel-title">Dossiê da Vítima: Elisa Drummond</h3>
              <p><strong>Idade em 2009:</strong> 36 anos.<br/><strong>Ocupação:</strong> Servidora Pública (Prefeitura de Araçatins).<br/><strong>Caso:</strong> 2009-447 (Desaparecimento e Homicídio).</p>
              <p className="alert-message">
                ⚠️ Alerta do Sistema: Sugerimos a impressão dos documentos físicos (B.O., Laudos, Fichas). Escaneie os QR Codes impressos para conectar serviços externos (DP17 e DNA).
              </p>
            </div>
          )}

          {activeTab === 'suspeitos' && (
            <div className="glass-panel" style={{gridColumn: '1 / -1', borderLeft: '4px solid var(--accent-blue)'}}>
              <h3 className="panel-title">Quadro de Suspeitos</h3>
              <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '10px'}}>
                <div style={{padding: '10px', border: '1px solid #334155', borderRadius: '4px', flex: '1 1 200px'}}><strong>Dr. Lemos</strong> - Pediatra e Tutor. Álibi: Cirurgia de emergência.</div>
                <div style={{padding: '10px', border: '1px solid #334155', borderRadius: '4px', flex: '1 1 200px'}}><strong>Marcelo Souza</strong> - Ex-marido. Álibi: Bar no Porto Seco.</div>
                <div style={{padding: '10px', border: '1px solid #334155', borderRadius: '4px', flex: '1 1 200px'}}><strong>Lúcia Fernandes</strong> - Assistente. Álibi: Assistindo TV em casa.</div>
                <div style={{padding: '10px', border: '1px solid #334155', borderRadius: '4px', flex: '1 1 200px'}}><strong>Beto Graxa</strong> - Borracheiro local. Álibi: Dormindo no pátio.</div>
              </div>
              <p style={{color: '#94a3b8', fontSize: '0.9rem', marginTop: '15px'}}>Consulte as fichas em papel para avaliar as TAGS DO CODIS de seus DNAs.</p>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="glass-panel" style={{gridColumn: '1 / -1', borderLeft: '4px solid #facc15'}}>
              <h3 className="panel-title">Linha do Tempo (12 de Nov de 2009)</h3>
              <ul style={{listStyle: 'none', paddingLeft: '10px', borderLeft: '2px solid #334155'}}>
                <li style={{marginBottom: '10px'}}><span style={{color: '#facc15', fontWeight: 'bold'}}>Tarde:</span> Elisa e Marcelo brigam agressivamente na praça.</li>
                <li style={{marginBottom: '10px'}}><span style={{color: '#facc15', fontWeight: 'bold'}}>Noite:</span> Lúcia nota Elisa com comportamento estranho na prefeitura.</li>
                <li style={{marginBottom: '10px'}}><span style={{color: '#facc15', fontWeight: 'bold'}}>22:30:</span> Hora presumida do desaparecimento. Carro achado abandonado na PR-320 (perto do Porto Seco).</li>
                <li style={{marginBottom: '10px'}}><span style={{color: '#facc15', fontWeight: 'bold'}}>22:45:</span> Internet GSS da delegacia central cai. (Conforme anotado no B.O.)</li>
              </ul>
            </div>
          )}

          <div className="glass-panel">
            <h3 className="panel-title">Acesso Rápido a Sistemas</h3>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
               <li style={{padding: '10px', borderBottom: '1px solid #334155'}}><a href="../dp17-aracatins/" target="_blank" style={{color: 'var(--accent-blue)', textDecoration: 'none'}}>» DP17 - Inquérito Policial</a></li>
               <li style={{padding: '10px', borderBottom: '1px solid #334155'}}><a href="../lab-forense-pr/" target="_blank" style={{color: 'var(--accent-blue)', textDecoration: 'none'}}>» LAB Forense - CODIS DNA</a></li>
               <li style={{padding: '10px'}}><a href="../vozes-do-caso/" target="_blank" style={{color: 'var(--accent-blue)', textDecoration: 'none'}}>» Escuta - Central de Áudios</a></li>
            </ul>
          </div>

          <div className="glass-panel">
            <h3 className="panel-title">Anotações do Detetive</h3>
            <p style={{color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem'}}>Sistema pronto para reabertura de caso. O mandante sempre comete um erro de vaidade na elaboração do crime.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
