import React from 'react'
import {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { useTrail, animated } from 'react-spring';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";
import "../styles/moves.css";
import ThemeContext from "../context/context";

const Moves = () => {
    const params = useParams();
    const url = `https://pokeapi.co/api/v2/pokemon/${params.pokeId}`;
    console.log(params);
    const [pokemove, setPokemove] = useState({});
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        axios.get(url)
        .then(res => {
            console.log(res.data);
            setPokemove(res.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(true);
            Swal.fire(error.response.data);
        })
    },[url])

    const trail = useTrail(pokemove.moves ? pokemove.moves.length : 0,{
        from: { opacity: 0, transform: 'translateX(-20px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        // delay: 10, // Retardo inicial de 10ms para cada movimiento
    });
    
    if(loading) return   <span className="spinner"></span> 

    console.log(pokemove.moves.length);
    return (
        <div className='moveContainer' style={{ background: theme.background, color: theme.color }}>
            <div className="moves"> 
                <div className="moveImagen">
                    <Link  to={`/${pokemove.name}`}>
                        <img id="pokeImg" className="wing leftWing righWing" src={pokemove.sprites.other.dream_world.front_default} alt={pokemove.name}/> 
                    </Link>
                </div>
                <div>
                    <h4 className='dato'>{pokemove.name.toLocaleUpperCase()} puede realizar {pokemove.moves.length} movimientos</h4>
                    <div className="move">
                        {trail.map((style, index) => (
                        pokemove.moves && ( 
                            <animated.p className="array moveOption" key={index} style={style}>
                                {pokemove.moves[index].move.name}
                            </animated.p>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Moves;