import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dossie');
  const [notes, setNotes] = useState('');
  const [mainSuspect, setMainSuspect] = useState('');
  
  // Progress tracker variables
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load local storage
    setNotes(localStorage.getItem('user_notes') || '');
    setMainSuspect(localStorage.getItem('main_suspect') || '');
    
    // Simulate reading cross-app local storage flags if they existed
    let score = 0;
    if (localStorage.getItem('ev_dna')) score++;
    if (localStorage.getItem('ev_escuta')) score++;
    if (localStorage.getItem('ev_boletim')) score++;
    setProgress(score);
  }, []);

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem('user_notes', e.target.value);
  }

  const toggleSuspect = (suspectName) => {
    const newTarget = mainSuspect === suspectName ? '' : suspectName;
    setMainSuspect(newTarget);
    localStorage.setItem('main_suspect', newTarget);
  }

  return (
    <div className="app-container">
      {/* Immersive Background Audio */}
      <audio autoPlay loop src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_d07a166aa4.mp3?filename=rain-and-thunder-16705.mp3" style={{display: 'none'}} />

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
                {['Dr. Lemos - Pediatra e Tutor. Álibi: Cirurgia de emergência.',
                  'Marcelo Souza - Ex-marido. Álibi: Bar no Porto Seco.',
                  'Lúcia Fernandes - Assistente. Álibi: Assistindo TV em casa.',
                  'Beto Graxa - Borracheiro local. Álibi: Dormindo no pátio.'].map(suspect => {
                    const name = suspect.split(' - ')[0];
                    const isTarget = mainSuspect === name;
                    return (
                      <div 
                        key={name}
                        onClick={() => toggleSuspect(name)}
                        style={{
                          padding: '10px', 
                          border: isTarget ? '2px solid red' : '1px solid #334155', 
                          borderRadius: '4px', 
                          flex: '1 1 200px',
                          cursor: 'pointer',
                          backgroundColor: isTarget ? 'rgba(255,0,0,0.1)' : 'transparent',
                          transition: 'all 0.2s'
                        }}>
                        <strong>{name}</strong> - {suspect.split(' - ')[1]}
                        {isTarget && <div style={{color: 'red', fontSize: '0.8rem', marginTop: '5px'}}>ALVO PRINCIPAL DE INVESTIGAÇÃO</div>}
                      </div>
                    )
                })}
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

          <div className="glass-panel" style={{gridColumn: '1 / -1', display: 'flex', gap: '20px'}}>
            <div style={{flex: 1}}>
              <h3 className="panel-title">Bloco de Notas da Escrivaninha</h3>
              <textarea 
                value={notes}
                onChange={handleNoteChange}
                placeholder="Insira notas soltas, inconsistências e suspeitas de álibis aqui..."
                style={{
                  width: '100%', 
                  height: '150px', 
                  backgroundColor: 'rgba(0,0,0,0.5)', 
                  border: '1px solid #334155', 
                  color: '#94a3b8', 
                  padding: '10px', 
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
            <div style={{width: '250px', backgroundColor: 'rgba(0,255,0,0.05)', border: '1px solid rgba(0,255,0,0.2)', padding: '20px'}}>
              <h3 className="panel-title" style={{color: '#4ade80', borderColor: '#4ade80'}}>PROGRESSO DA INVESTIGAÇÃO</h3>
              <div style={{fontSize: '2rem', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px'}}>
                {progress} / 3
              </div>
              <p style={{fontSize: '0.8rem', textAlign: 'center', color: '#94a3b8'}}>Arquivos Ocultos Encontrados</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
