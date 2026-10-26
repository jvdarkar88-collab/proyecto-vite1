import React, { useState } from 'react';

function ActividadItem({ titulo, tiempo, tipo }) {
    // Hook useState para alternar entre pendiente y completada
    const [completada, setCompletada] = useState(false);

    const alternarEstado = () => {
        setCompletada(!completada);
    };

    return (
        <div style={{ 
            border: completada ? '1px solid #38ef7d' : '1px solid #cbd5e1', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '10px', 
            background: completada ? '#e6fffa' : '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        }}>
            <div>
                <span style={{ background: '#0ea5e9', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8em' }}>{tipo}</span>
                <h4 style={{ 
                    margin: '8px 0 4px 0', 
                    color: completada ? '#22543d' : '#0f172a',
                    textDecoration: completada ? 'line-through' : 'none'
                }}>
                    {titulo}
                </h4>
                <p style={{ margin: 0, fontSize: '0.85em', color: '#64748b' }}>⏱️ Duración: {tiempo}</p>
            </div>

            <button
                onClick={alternarEstado}
                style={{
                    backgroundColor: completada ? '#38ef7d' : '#e2e8f0',
                    color: completada ? '#047857' : '#334155',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.85em',
                    transition: 'all 0.2s ease'
                }}
            >
                {completada ? '✅ Completada' : '⏳ Pendiente'}
            </button>
        </div>
    );
}

export default ActividadItem;