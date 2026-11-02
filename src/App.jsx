import React, { useState } from 'react'; // ➕ se agregó useState
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'; // ➕ NUEVO
import './App.css';
import HeaderClase from './components/HeaderClase';
import ObjetivosCard from './components/ObjetivosCard';
import ActividadItem from './components/ActividadItem';

// ➕ NUEVO: variantes de animación (solo opacity y transform, que no obligan al navegador a recalcular el layout)
// El padre orquesta la entrada escalonada y cada hijo solo describe sus dos estados.
const orquesta = {
    oculto: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const aparecer = {
    oculto: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// ➕ NUEVO: la sección aparece y, a su vez, escalona la entrada de sus actividades
const seccion = {
    oculto: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

// ➕ NUEVO: elevación al pasar el cursor. Motion ignora whileHover con toques táctiles,
// así que en el teléfono no queda "pegado" como ocurre con :hover de CSS.
const elevar = { y: -4, transition: { duration: 0.15 } };

function App() {
    // ➕ NUEVO: estado que controla si se muestra la tarjeta de objetivos
    const [verObjetivos, setVerObjetivos] = useState(true);

    return (
        // ➕ reducedMotion="user": respeta la preferencia de movimiento reducido del dispositivo
        <MotionConfig reducedMotion="user">
            {/* ➕ div -> motion.div con fade-in (initial/animate). El style original no cambia */}
            <motion.div
                style={{ maxWidth: '750px', margin: '30px auto', padding: '0 20px', fontFamily: 'Segoe UI, sans-serif' }}
                variants={orquesta}
                initial="oculto"
                animate="visible"
            >
                {/* Componente 1: Encabezado */}
                <motion.div variants={aparecer}>
                    <HeaderClase 
                        tituloTema="Componentes Modulares e Interactividad en React"
                        nombreDocente="José Daniel Ventura"
                        horario="7:00 AM - 13:00 PM"
                    />
                </motion.div>

                {/* ➕ NUEVO: botón que alterna el estado verObjetivos */}
                <motion.button
                    type="button"
                    variants={aparecer}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVerObjetivos((v) => !v)}
                    aria-expanded={verObjetivos}
                    aria-controls="objetivos"
                    style={{
                        display: 'block',
                        margin: '12px 0',
                        minHeight: '44px',
                        padding: '10px 16px',
                        border: 'none',
                        borderRadius: '8px',
                        background: '#002b49',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    {verObjetivos ? 'Ocultar objetivos' : 'Mostrar objetivos'}
                </motion.button>

                {/* Componente 2: Metas y Objetivos */}
                <motion.div id="objetivos" variants={aparecer} whileHover={elevar}>
                    {/* ➕ AnimatePresence permite animar la salida cuando el componente se desmonta */}
                    <AnimatePresence initial={false}>
                        {verObjetivos && (
                            <motion.div
                                key="tarjeta-objetivos"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.25 }}
                            >
                                <ObjetivosCard 
                                    competencia="Estructura aplicaciones web SPA modulares utilizando componentes en React con JSX y gestión de estado local."
                                    indicadorLogro="Aplica el paso de props mediante desestructuración e implementa Hooks como useState para interactividad."
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Componente 3: Secuencia Didáctica con Estado Interactivo */}
                {/* ➕ section -> motion.section */}
                <motion.section style={{ marginTop: '25px' }} variants={seccion}>
                    <h3 style={{ color: '#002b49', fontSize: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
                        📋 Secuencia de Actividades
                    </h3>
                    
                    {/* ➕ Cada ActividadItem se envuelve en un motion.div con fade-in y whileHover */}
                    <motion.div variants={aparecer} whileHover={elevar}>
                        <ActividadItem 
                            titulo="Trivia Rápida Interactiva sobre JSX" 
                            tiempo="10 minutos" 
                            tipo="Diagnóstica" 
                        />
                    </motion.div>
                    <motion.div variants={aparecer} whileHover={elevar}>
                        <ActividadItem 
                            titulo="Taller Guiado: Creación y Desestructuración de Props" 
                            tiempo="30 minutos" 
                            tipo="Construcción" 
                        />
                    </motion.div>
                    <motion.div variants={aparecer} whileHover={elevar}>
                        <ActividadItem 
                            titulo="Laboratorio Práctico con Hook useState" 
                            tiempo="35 minutos" 
                            tipo="Aplicación" 
                        />
                    </motion.div>
                    <motion.div variants={aparecer} whileHover={elevar}>
                        <ActividadItem 
                            titulo="Cierre e Intercambio de Código" 
                            tiempo="15 minutos" 
                            tipo="Evaluación" 
                        />
                    </motion.div>
                </motion.section>
            </motion.div>
        </MotionConfig>
    );
}

export default App;