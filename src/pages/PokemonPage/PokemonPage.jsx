import './PokemonPage.scss'
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypeLabel } from '../../components';

const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const PokemonPage = () => {

  const {name} = useParams();
  const [pokemonInfo, setPokemonInfo] = useState(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemonInfo(data))
  },[name])

  return (
    <div className="pokemon-page">
      {
      pokemonInfo && 
      <div className="container bg-white flex flex-column">
        <section className='flex'>
          <div >
            <span className='fs-36 fw-5 text-capitalize'>{pokemonInfo.name}</span>
            <span className='fs-36 fw-4 text-grey'> N.º {('0000' + pokemonInfo.id).slice(-5)}</span>
          </div>
          <div>
            {pokemonInfo.types.map(type => (
              <Link to={`/type/${type.type.name}`} key={type.type.name} >
                <TypeLabel type={type.type.name}/>
              </Link>
            ))}
          </div>
        </section>
        <section className='w-100 flex'>
          <div className='w-100 flex flex-center'>
            <img className='w-100' src={`${pokemonInfo.sprites.front_default}`} alt={pokemonInfo.name + '-image'} />
          </div>
          <div className='w-100 flex flex-column stats'>
            {pokemonInfo.stats.map(stat => (
              <span className='fw-5 fs-20' key={stat.stat.name}>
                <span className='text-capitalize'>{stat.stat.name}:</span>
                <span> {stat.base_stat}</span>
              </span>
            ))}
          </div>
        </section>
        <section className='w-100 flex flex-between'>
          <img src={`${pokemonInfo.sprites.front_default}`} alt={pokemonInfo.name + '-front_default'} />
          <img src={`${pokemonInfo.sprites.back_default}`} alt={pokemonInfo.name + '-back_default'} />
          <img src={`${pokemonInfo.sprites.front_shiny}`} alt={pokemonInfo.name + '-front_shiny'} />
          <img src={`${pokemonInfo.sprites.back_shiny}`} alt={pokemonInfo.name + '-back_shiny'} />
        </section>
      </div>
    }
    </div>
  )
}

export default PokemonPage