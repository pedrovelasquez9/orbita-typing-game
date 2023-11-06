import { getSettingsFromLocalStorage } from './utils.js';
const wordArray = [
    "aventura", "mariposa", "complejo", "felicidad", "fantástico", "elefante",
    "misterio", "tecnología", "creatividad", "universidad", "maravilla", "increíble",
    "esperanza", "naturaleza", "personalidad", "imposible", "interesante", "silencioso",
    "generación", "estupendo", "pintoresco", "profundidad", "sorprendente", "contagioso",
    "oportunidad", "inolvidable", "curiosidad", "imaginario", "deslumbrante", "ciudadano",
    "pasión", "recomendación", "delicioso", "encantador", "inspiración", "espectacular",
    "adrenalina", "crecimiento", "enriquecedor", "efervescencia", "vulnerabilidad",
    "extraordinario", "resplandor", "perspectiva", "atractivo", "consistencia", "enigmático",
    "marioneta", "sentimiento", "travesía", "atmósfera", "realidad", "adversidad",
    "magnífico", "similitud", "paralelo", "infinito", "aprendizaje", "colaboración",
    "independencia", "trascendencia", "equilibrio", "pintura", "alucinante", "revolución",
    "inteligencia", "espontáneo", "satisfacción", "transformación", "cuestionamiento",
    "autenticidad", "conciencia", "integridad", "colosal", "inquietud", "desarrollo",
    "mágico", "innovación", "experiencia", "profundo", "autonomía", "celebración", "sublime",
    "ternura", "entusiasmo", "espíritu", "cosmos", "conexión", "brillante", "historia",
    "compasión", "invencible", "abundancia", "interacción", "genuino", "espacial",
    "recuerdo", "sublimidad", "solidaridad", "perspicacia", "esencia", "influencia",
    "apasionado", "relevancia", "insignificante", "contradicción", "inmortal", "creativo",
    "imaginación", "incertidumbre", "inexplicable", "cualidad", "maravilloso", "espectro",
    "complicidad", "interminable", "trascendental", "indomable", "autenticidad", "valentía",
    "singularidad", "propósito", "aventurero", "reflexión", "consciencia", "nostalgia",
    "serenidad", "innovador", "fascinante", "inspirador", "inigualable", "memoria",
    "vulnerable", "delicadeza", "amistad", "intrépido", "intuición", "paradigma", "ausencia",
    "navegante", "melodía", "desafío", "inquietante", "esplendor", "efervescencia",
    "sensibilidad", "deslumbrante", "infinito", "contemplación", "mariposa", "belleza",
    "conciencia", "armonía", "emoción", "trascendencia", "conexión", "vivencia", "plenitud",
    "impresionante", "encanto", "irrepetible", "vibrante", "originalidad", "imaginario",
    "fascinación", "resistencia", "profundidad", "inolvidable", "intensidad", "percepción",
    "integridad", "sorprendente", "espontáneo", "espíritu", "despertar", "creatividad",
    "autenticidad", "impacto", "caminante", "persistencia", "universo", "naturaleza",
    "inspiración", "maravilla", "experiencia", "aventura", "libertad", "cambiar",
    "desarrollo", "cuestionamiento", "extraordinario", "posibilidad", "abundancia",
    "compartir", "despertar", "esencia", "riqueza", "compromiso", "época", "sabiduría"
];

export const getWordsArrayBySettingsOrPlatform = () => {

    const gameSettings = getSettingsFromLocalStorage();
    //check if its windows or mac os
    if (navigator.userAgent.includes('Win') && gameSettings?.['enable-accents']) {
        return wordArray;
    }
    return removeAccentsFromWordsArray();
}

const removeAccentsFromWordsArray = () => {
    return wordArray.filter(word => !hasAccent(word));
}

const hasAccent = (word) => {
    const specialChars = /[áéíóúÁÉÍÓÚ]/;
    return specialChars.test(word);
}