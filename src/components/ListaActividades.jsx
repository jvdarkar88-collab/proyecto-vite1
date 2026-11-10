import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ActividadItem from './ActividadItem';
import { orquesta } from '../animaciones';

// El endpoint y el token viven en el archivo .env: nunca se escriben directamente en el código.
// VITE_NOCODB_URL   -> https://app.nocodb.com/api/v3/data/<baseId>/<tableId>/records
// VITE_NOCODB_TOKEN -> tu API token de NocoDB
const URL_API = import.meta.env.VITE_NOCODB_URL;
const TOKEN = import.meta.env.VITE_NOCODB_TOKEN;

const estiloMensaje = {
    padding: '15px',
    borderRadius: '8px',
    margin: '0 0 10px 0',
    background: '#f8fafc',
    border: '1px solid #cbd5e1',
    color: '#475569',
};

function ListaActividades() {
    // ---------- Paso 2.1: estructuración de estados ----------
    const [registros, setRegistros] = useState([]); // almacena los registros que devuelve NocoDB
    const [cargando, setCargando] = useState(true); // semáforo de carga: true mientras llega la respuesta
    const [error, setError] = useState(null);       // mensaje para el estudiante si algo falla

    // ---------- Paso 2.2: el mensajero asincrónico ----------
    useEffect(() => {
        // Si falta la configuración, avisamos en pantalla en vez de dejar la página en blanco
        if (!URL_API || !TOKEN) {
            setError('Falta configurar VITE_NOCODB_URL y VITE_NOCODB_TOKEN en el archivo .env');
            setCargando(false);
            return;
        }

        // Permite cancelar la petición si el componente se desmonta antes de que responda
        const controlador = new AbortController();

        fetch(URL_API, {
            headers: {
                'xc-token': TOKEN,          // cabecera de seguridad que exige NocoDB
                Accept: 'application/json',
            },
            signal: controlador.signal,
        })
            .then((respuesta) => {
                // fetch NO falla con errores 401, 404 o 500: hay que revisarlo a mano
                if (!respuesta.ok) {
                    throw new Error(`NocoDB respondió con el código ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then((datos) => {
                // En la API v3 la lista llega en "records"
                setRegistros(datos.records ?? []);
            })
            // ---------- Paso 2.3: blindaje ante fallos ----------
            .catch((e) => {
                if (e.name === 'AbortError') return; // limpieza normal del efecto, no es un fallo real
                console.error('Error al cargar las actividades:', e);
                setError('No se pudieron cargar las actividades. Revisa tu conexión e inténtalo de nuevo.');
            })
            .finally(() => {
                // Apagamos el semáforo solo si esta petición sigue vigente
                if (!controlador.signal.aborted) setCargando(false);
            });

        return () => controlador.abort();
    }, []);

    // ---------- Renderizado según el estado ----------
    if (cargando) {
        return <p role="status" style={estiloMensaje}>⏳ Cargando actividades...</p>;
    }

    if (error) {
        return (
            <p role="alert" style={{ ...estiloMensaje, background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
                ⚠️ {error}
            </p>
        );
    }

    if (registros.length === 0) {
        return <p style={estiloMensaje}>No hay actividades registradas todavía.</p>;
    }

    return (
        // variants={orquesta}: las actividades entran escalonadas aunque lleguen después de cargar la página
        <motion.div variants={orquesta}>
            {/* Paso 2.3: .map() extrayendo los datos de la sub-propiedad "fields" */}
            {registros.map(({ id, fields }) => (
                <ActividadItem
                    key={id}
                    titulo={fields?.titulo}
                    tiempo={fields?.tiempo}
                    tipo={fields?.tipo}
                />
            ))}
        </motion.div>
    );
}

export default ListaActividades;