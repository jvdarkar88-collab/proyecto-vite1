import React from 'react';
import { motion } from 'framer-motion'; // ➕ NUEVO
import { aparecer, elevar } from '../animaciones'; // ➕ NUEVO

function ObjetivosCard({ competencia, indicadorLogro }) {
    return (
        // ➕ div -> motion.div: entra con el padre (variants), se eleva (whileHover)
        //    y sale con animación cuando App.jsx la oculta (exit)
        <motion.div
            variants={aparecer}
            whileHover={elevar}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            style={{
                background: '#ffffff',
                borderLeft: '5px solid #0f4c81',
                borderRadius: '8px',
                padding: '20px',
                margin: '20px 0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
        >
            <h3 style={{ margin: '0 0 10px 0', color: '#002b49', fontSize: '18px' }}>🎯 Metas de la Sesión</h3>
            <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#0f4c81' }}>Competencia:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#4a5568', fontSize: '14px' }}>{competencia}</p>
            </div>
            <div>
                <strong style={{ color: '#0f4c81' }}>Indicador de Logro:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#4a5568', fontSize: '14px' }}>{indicadorLogro}</p>
            </div>
        </motion.div>
    );
}

export default ObjetivosCard;
