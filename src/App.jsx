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
          <div className="glass-panel" style={{gridColumn: '1 / -1'}}>
            <h3 className="panel-title">Mesa de Trabalho</h3>
            <p className="alert-message">
              ⚠️ Alerta do Sistema: Aguardando preenchimento da base de dados e integração das mídias neurais (DALL-E e ElevenLabs).
            </p>
          </div>

          <div className="glass-panel">
            <h3 className="panel-title">Acesso Rápido</h3>
            <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Bancos de dados auxiliares serão liberados quando o detetive escanear os QR Codes dos documentos.</p>
          </div>

          <div className="glass-panel">
            <h3 className="panel-title">Anotações Recentes</h3>
            <p style={{color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem'}}>Nenhuma anotação gravada no sistema ainda.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
