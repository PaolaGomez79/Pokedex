import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext} from "react";
import "../styles/home.css";
import axios from "axios";
import ThemeContext from "../context/context";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const hasFetchedData = useRef(false);
  const { theme } = useContext(ThemeContext);
  

  const pokeapi = async() =>{
    const resultado = await axios.get(url);
    console.log(resultado);
    setNextUrl(resultado.data.next);
    setPrevUrl(resultado.data.previous);
    getPokemon(resultado.data.results);
    setLoading(false);
  }
 
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      console.log(result);
      setPokemons((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        hasFetchedData.current = false;
        return state;
      });
    });
  };
                                                              

  useEffect(() => {
    if (hasFetchedData.current === false) {
      pokeapi();
      hasFetchedData.current = true;
    } 
  }, [url]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="pokeContainer" style={{ background: theme.background, color: theme.color }}>
          <div className="pokeList">
            {pokemons.map((pokemon) => (
              <Link to={`/${pokemon.name}`} key={pokemon.id} className="pokeOption">
                <div className="card">
                  <h2>{pokemon.id}</h2>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <h2>{pokemon.name}</h2>
                </div>
              </Link>
            ))}
          </div>
          <div className="btn-group">
            {prevUrl && <button id="boton"
              onClick={() => {
                setPokemons([])
                setUrl(prevUrl);
              }}
              style={{ background: theme.backgroundBtn, border: theme.border }} 
            >
              Previous
            </button>}
            {nextUrl && <button id="boton"
              onClick={() => {
                setPokemons([])
                setUrl(nextUrl);
              }}
              style={{ background: theme.backgroundBtn, border: theme.border }}
            >
              Next
            </button>}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
