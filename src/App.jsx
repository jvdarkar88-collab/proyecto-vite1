import React from 'react';
import './App.css';
import HeaderClase from './components/HeaderClase';
import ObjetivosCard from './components/ObjetivosCard';
import ActividadItem from './components/ActividadItem';

function App() {
    return (
        <div style={{ maxWidth: '750px', margin: '30px auto', padding: '0 20px', fontFamily: 'Segoe UI, sans-serif' }}>
            {/* Componente 1: Encabezado */}
            <HeaderClase 
                tituloTema="Componentes Modulares e Interactividad en React"
                nombreDocente="José Daniel Ventura"
                horario="7:00 AM - 13:00 PM"
            />

            {/* Componente 2: Metas y Objetivos */}
            <ObjetivosCard 
                competencia="Estructura aplicaciones web SPA modulares utilizando componentes en React con JSX y gestión de estado local."
                indicadorLogro="Aplica el paso de props mediante desestructuración e implementa Hooks como useState para interactividad."
            />

            {/* Componente 3: Secuencia Didáctica con Estado Interactivo */}
            <section style={{ marginTop: '25px' }}>
                <h3 style={{ color: '#002b49', fontSize: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
                    📋 Secuencia de Actividades
                </h3>
                
                <ActividadItem 
                    titulo="Trivia Rápida Interactiva sobre JSX" 
                    tiempo="10 minutos" 
                    tipo="Diagnóstica" 
                />
                <ActividadItem 
                    titulo="Taller Guiado: Creación y Desestructuración de Props" 
                    tiempo="30 minutos" 
                    tipo="Construcción" 
                />
                <ActividadItem 
                    titulo="Laboratorio Práctico con Hook useState" 
                    tiempo="35 minutos" 
                    tipo="Aplicación" 
                />
                <ActividadItem 
                    titulo="Cierre e Intercambio de Código" 
                    tiempo="15 minutos" 
                    tipo="Evaluación" 
                />
            </section>
        </div>
    );
}

export default App;