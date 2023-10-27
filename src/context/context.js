import React from "react";

export const themes = {
  light: {
    background:"linear-gradient(#f4f5f6, #9b4dca)",
    backgroundBtn: "purple",
    backgroundPoke:"linear-gradient(#f5f7f6, #D29BFD)",
    border: "none",
    color: "#000000",
    colorHome:"purple"
  },
  dark: {
    background:"linear-gradient(315deg,#923cb5 0%, #000000 74%",
    backgroundBtn: "rgb(255, 112, 40)",
    backgroundPoke: "linear-gradient(315deg,#923cb5 0%, #000000 74%",
    border:"none",
    color: "#ffffff",
    colorHome:"#ffffff"
  },
};

const ThemeContext = React.createContext(themes.light);

export default ThemeContext;
