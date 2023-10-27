import axios from "axios";
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import ThemeContext from "../context/context";
import "../styles/pokemon.css";
import "../styles/buscar.css";
/* import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/card" */

function Buscar() {
  const [pokemons, setPokemons] = useState([]);
  const [buscarNombre, setBuscarNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const search = useRef();

  const handleChange = () => {
    setBuscarNombre(search.current.value);
  };


  const buscarPoke = async () => {
    setBuscarNombre(search.current.value);
    setBuscarNombre(buscarNombre.trim().toLocaleLowerCase());

    if(buscarNombre.length === 0) {
      setBuscarNombre("");
      setPokemons([]);
      setLoading(true);
    }
    else if(buscarNombre.length > 0) {
      const urlPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
      // console.log(urlPokemons);
      const pokesData = urlPokemons.data.results;
      const pokeNombre = pokesData.map((poke) => {return poke.name }).find((nombre) => {
        return nombre.match(buscarNombre);
        });
      const urlPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNombre}`);  
      const datosPoke = urlPoke.data;
      // console.log(datosPoke);
      setPokemons(datosPoke);
      setLoading(false);
      //console.log(pokemons);
    }
  };

  useEffect(() => {
    search.current.focus();
    buscarPoke();
  }, [buscarNombre]);


  //if(loading) return <span className="spinner"></span>
  return (
    <>
      <div className="container" style={{ background: theme.backgroundPoke, color: theme.color }}>
        <div className="containerInput">
          <label>Buscar: </label>
          <input
            type="text"
            id="filtrarNombre"
            value={buscarNombre}
            ref={search}
            onChange={handleChange}
            placeholder="Digite el nombre del pokemon"
          />
          <span class="material-symbols-outlined">search</span>
        </div>
        {loading ? (<div/>) : (
          <div className="pokemon">
              <h1 style={{color: theme.color}}>{pokemons.name}</h1>
              <img
                id="pokemonImg"
                src={pokemons.sprites.other.dream_world.front_default}
                alt={pokemons.name}
              />  
              <div className="datos" style={{ color: theme.color }}> 
                <div className="group">
                  <h3>Id: {`${pokemons.id}`}</h3>
                </div>
                <div className="group">
                  <h3>Height: {`${pokemons.height} Feet`}</h3>
                </div>
                <div className="group">
                  <h3>Weight: {`${pokemons.weight} Kg`}</h3>
                </div> 
                <div className="group">
                  <h3>Types:</h3>
                  {pokemons.types.map((type) => (
                    <h3 className="array" key={type.type.name}>
                      {type.type.name}
                    </h3>
                  ))}
                </div> 
                <div className="abilities">
                  <div className="group">
                    <h3>Abilities:</h3>
                    {pokemons.abilities.map((ability) => (
                      <h3 className="array" key={ability.ability.name}>
                        {ability.ability.name}
                      </h3>
                    ))}
                  </div>
                </div>   
            </div>
          </div>) 
        } 
      </div> 
    </>
  );
}

export default Buscar;
