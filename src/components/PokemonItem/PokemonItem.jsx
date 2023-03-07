import './PokemonItem.scss'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

const PokemonItem = ({pokemon}) => {

  const [pokemonInfo, setPokemonInfo] = useState(null)

  useEffect(()=> {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then( res => res.json())
      .then( data => setPokemonInfo(data))
  }, [])

  return (
    <Link to={`/pokemon/${pokemon.name}`} className='flex flex-column flex-center bg-white pokemon-item'>
      {pokemonInfo && <span className='fs-20 fw-4 text-grey'> N.º {pokemonInfo.id}</span>}
      {pokemonInfo && <img className='w-100' src={`${pokemonInfo.sprites.front_default}`} alt={pokemonInfo.name} />}
      <span className="text-capitalize fs-20 fw-5 w-100 text-center">{pokemon.name}</span>
    </Link>
  )
}

export default PokemonItem