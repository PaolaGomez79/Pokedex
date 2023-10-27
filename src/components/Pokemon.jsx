import React from 'react'
import {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";
import "../styles/pokemon.css";
import ThemeContext from "../context/context";

const Pokemon = () => {
    const params = useParams();
    const url = `https://pokeapi.co/api/v2/pokemon/${params.pokeName}`;
    console.log(params);
    const [poke, setPoke] = useState({});
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        axios.get(url)
        .then(res => {
            console.log(res.data);
            setLoading(true);
            setPoke(res.data)
        })
        .catch(error => {
            setLoading(false);
            Swal.fire(error.response.data);
        })
    },[url]);
    
    if(!loading) return  <span className="spinner"></span> 
    console.log(poke +"poke");
    return (
        <div className="pokemon" style={{ background: theme.backgroundPoke, color: theme.color }}>
            <h1 style={{ color: theme.color }}>{poke.name}</h1>
            <img id="pokemonImg" src={poke.sprites.other.dream_world.front_default} alt={poke.name}/>
            <div className='shadow'>.</div>
            <div className="datos" style={{ color: theme.color }}>
                <div className='abilities'>
                    <div className="group">
                        <h3>Abilities:</h3>
                        {poke.abilities.map(ability => <h3 className="array" key={ability.ability.name}>{ability.ability.name}</h3>)}
                    </div>
                </div>    
                <div className="group" style={{ color: theme.color }}>
                    <h3>Height: {`${poke.height} Feet`}</h3>
                </div>
                <div className="group">
                    <h3>Weight: {`${poke.weight} Kg`}</h3>
                </div>    
                <div className="group">
                    <h3>Types:</h3>
                    {poke.types.map(type => <h3 className="array" key={type.type.name}>{type.type.name}</h3>)}
                </div>
                <div className='base-stat'>
                    {poke.stats.map((item,index )=> <h3 key={index}>{item.stat.name}: {item.base_stat}</h3>)}
                </div>
            </div>
            <div className="botonMove">
                <Link key={poke.id} to={`/${poke.name}/${poke.id}`} className='pokeMove' style={{ background: theme.backgroundBtn, border: theme.border}}>Moves</Link>
            </div>
        </div>
    )
    
}

export default Pokemon;