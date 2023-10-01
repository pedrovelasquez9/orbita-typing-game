const purplePlanetElem = document.querySelector("#purple-planet");
const redPlanetElem = document.querySelector("#red-planet");
const TWITCH_LINK = "https://www.twitch.tv/programacion_es";
const YOUTUBE_LINK = "https://www.youtube.com/@programacion-es";
const DEFAULT_TARGET = "_blank";

purplePlanetElem.addEventListener("click", () => {
    window.open(TWITCH_LINK, DEFAULT_TARGET);
});

redPlanetElem.addEventListener("click", () => {
    window.open(YOUTUBE_LINK, DEFAULT_TARGET);
});