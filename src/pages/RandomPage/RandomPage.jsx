import './RandomPage.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TypeLabel } from '../../components'

const getRandomPokemon = async ({setPokemon}) => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then(res => res.json())
    .then(data => {
      const randomName = data.results[Math.floor(Math.random() * data.results.length)].name
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`)
        .then(res => res.json())
        .then(data => setPokemon({
          'id': data.id,
          'name': data.name,
          'sprite': data.sprites.front_default,
          'types': data.types.map(type => type.type.name),
        }))
    })
}

/// no abarca todos los pokemons, hay ids separado

const RandomPage = () => {

  const [pokemon, setPokemon] = useState(null)

  useEffect(()=> {
    getRandomPokemon({setPokemon})
  }, [])

  const handleRandom = () => {
    getRandomPokemon({setPokemon})
  }

  return (
    <div className='random-page container'>
      {
        pokemon ?
        <div className='random-card flex flex-column flex-between'>
          <Link to={'/pokemon/' + pokemon.name}>
            <span className='fs-36 fw-5 text-capitalize'>{pokemon.name}</span>
            <span className='fs-36 fw-4 text-grey'> N.º {('0000' + pokemon.id).slice(-5)}</span>
          </Link>
          
          <Link className='w-100 flex flex-center' to={'/pokemon/' + pokemon.name}>
            <img className='w-100' src={`${pokemon.sprite}`} alt={pokemon.name + '-image'} />
          </Link>
          <div className='flex flex-center'>
            {pokemon.types.map(type => (
              <Link to={`/type/${type}`} key={type} >
                <TypeLabel type={type}/>
              </Link>
            ))}
          </div>
          <button className='btn shuffle-icon' onClick={handleRandom}>
            <i className="fa-solid fa-shuffle fs-52"></i>
          </button>
        </div>
        :
        <div>Loading...</div>
      }
    </div>
  )
}

export default RandomPage