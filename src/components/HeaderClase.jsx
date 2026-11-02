import React from 'react';
import { motion } from 'framer-motion'; // ➕ NUEVO
import { aparecer } from '../animaciones'; // ➕ NUEVO

function HeaderClase({ tituloTema, nombreDocente, horario }) {
    return (
        // ➕ header -> motion.header: entra con la secuencia del padre (variants)
        <motion.header variants={aparecer} style={{
            background: 'linear-gradient(135deg, #002b49 0%, #0f4c81 100%)',
            color: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderBottom: '4px solid #38ef7d' // Detalle visual propio
        }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', tracking: '2px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '15px' }}>
                Plan de Clase Digital
            </span>
            <h1 style={{ margin: '12px 0 8px 0', fontSize: '26px' }}>{tituloTema}</h1>
            <div style={{ fontSize: '14px', opacity: 0.9, display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <span>👨‍🏫 Docente: <strong>{nombreDocente}</strong></span>
                <span>⏰ Horario: <strong>{horario}</strong></span>
            </div>
        </motion.header>
    );
}

export default HeaderClase;
