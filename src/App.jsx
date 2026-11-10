import React, { useState } from 'react'; // ➕ se agregó useState
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'; // ➕ NUEVO
import './App.css';
import HeaderClase from './components/HeaderClase';
import ObjetivosCard from './components/ObjetivosCard';
import ListaActividades from './components/ListaActividades'; // ✏️ antes: import ActividadItem (ahora la lista se arma con datos de NocoDB)
import { orquesta, aparecer, seccion } from './animaciones'; // ➕ NUEVO: variantes compartidas

function App() {
    // ➕ NUEVO: estado que controla si se muestra la tarjeta de objetivos
    const [verObjetivos, setVerObjetivos] = useState(true);

    return (
        // ➕ reducedMotion="user": respeta la preferencia de movimiento reducido del dispositivo
        <MotionConfig reducedMotion="user">
            {/* ➕ div -> motion.div: orquesta la entrada (initial/animate) de todo lo que contiene.
                Los componentes hijos heredan "oculto" y "visible" gracias a sus propios variants. */}
            <motion.div
                style={{ maxWidth: '750px', margin: '30px auto', padding: '0 20px', fontFamily: 'Segoe UI, sans-serif' }}
                variants={orquesta}
                initial="oculto"
                animate="visible"
            >
                {/* Componente 1: Encabezado */}
                <HeaderClase 
                    tituloTema="Componentes Modulares e Interactividad en React"
                    nombreDocente="José Daniel Ventura"
                    horario="7:00 AM - 13:00 PM"
                />

                {/* ➕ NUEVO: botón que alterna el estado verObjetivos */}
                <motion.button
                    type="button"
                    variants={aparecer}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVerObjetivos((v) => !v)}
                    aria-expanded={verObjetivos}
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
                {/* ➕ AnimatePresence permite que ObjetivosCard ejecute su animación de salida (exit) al desmontarse */}
                <AnimatePresence>
                    {verObjetivos && (
                        <ObjetivosCard 
                            key="objetivos"
                            competencia="Estructura aplicaciones web SPA modulares utilizando componentes en React con JSX y gestión de estado local."
                            indicadorLogro="Aplica el paso de props mediante desestructuración e implementa Hooks como useState para interactividad."
                        />
                    )}
                </AnimatePresence>

                {/* Componente 3: Secuencia Didáctica con Estado Interactivo */}
                {/* ➕ section -> motion.section: aparece y escalona la entrada de las actividades */}
                <motion.section style={{ marginTop: '25px' }} variants={seccion}>
                    <h3 style={{ color: '#002b49', fontSize: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
                        📋 Secuencia de Actividades
                    </h3>
                    {/* ✏️ Antes: 4 <ActividadItem> escritos a mano. Ahora se cargan desde NocoDB con fetch + useEffect */}
                    <ListaActividades />
                </motion.section>
            </motion.div>
        </MotionConfig>
    );
}

export default App;