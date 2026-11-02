import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ➕ NUEVO
import { aparecer, elevar } from '../animaciones'; // ➕ NUEVO

function ActividadItem({ titulo, tiempo, tipo }) {
    // Hook useState para alternar entre pendiente y completada
    const [completada, setCompletada] = useState(false);

    const alternarEstado = () => {
        setCompletada(!completada);
    };

    return (
        // ➕ div -> motion.div: entra con la secuencia del padre (variants) y se eleva (whileHover)
        <motion.div
            variants={aparecer}
            whileHover={elevar}
            style={{ 
                border: completada ? '1px solid #38ef7d' : '1px solid #cbd5e1', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '10px', 
                background: completada ? '#e6fffa' : '#f8fafc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // ✏️ CAMBIO: antes era 'all 0.3s ease'. 'all' incluye transform y competiría con Motion
                transition: 'background-color 0.3s ease, border-color 0.3s ease'
            }}
        >
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

            {/* ➕ button -> motion.button: whileTap da respuesta al toque */}
            <motion.button
                whileTap={{ scale: 0.95 }}
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
                    // ✏️ CAMBIO: antes era 'all 0.2s ease' (mismo motivo: no competir con el transform de whileTap)
                    transition: 'background-color 0.2s ease, color 0.2s ease'
                }}
            >
                {/* ➕ El texto sale y entra al cambiar de estado. La clave (key) le dice a AnimatePresence que es otro elemento */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={completada ? 'completada' : 'pendiente'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.1 }}
                        style={{ display: 'inline-block' }} // necesario: los transform no se aplican a elementos inline
                    >
                        {completada ? '✅ Completada' : '⏳ Pendiente'}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
}

export default ActividadItem;
