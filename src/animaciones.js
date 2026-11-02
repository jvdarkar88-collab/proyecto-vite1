// Variantes y gestos compartidos por App.jsx y los componentes.
// Solo se animan opacity y transform (y), que no obligan al navegador a recalcular el layout.

// El padre orquesta la entrada escalonada de sus hijos
export const orquesta = {
    oculto: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

// Estados de cada hijo: lo que declara es "cómo se ve oculto" y "cómo se ve visible"
export const aparecer = {
    oculto: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// Una sección que aparece y, a su vez, escalona la entrada de sus actividades
export const seccion = {
    oculto: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

// Elevación para whileHover. Motion ignora whileHover con toques táctiles,
// así que en el teléfono no queda "pegado" como ocurre con :hover de CSS.
export const elevar = { y: -4, transition: { duration: 0.15 } };