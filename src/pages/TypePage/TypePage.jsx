import './TypePage.scss'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { PokemonItem } from "../../components";

const TypePage = () => {
  /// cuando cambio de type a type se rompe
  const {name} = useParams();
  const [pokemonList, setPokemonList] = useState([])
  const [limit, setLimit] = useState(16)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${name}/`)
      .then(result => result.json())
      .then(data => setPokemonList([...pokemonList, ...data.pokemon.map(pokemon => pokemon.pokemon)]))
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect( () => {
    fetch(`https://pokeapi.co/api/v2/type/${name}/`)
      .then(result => result.json())
      .then(data => setPokemonList([...data.pokemon.map(pokemon => pokemon.pokemon)]))
  }, [name])
  
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLimit(limit => (limit <= 1000) ? limit + 16 : limit)
    }
  };

  return (
    <div className='type-page'>
      <div className='container flex flex-center flex-wrap pokemon-list'>
        {
          pokemonList.length > 0
          ?
          pokemonList.slice(0, limit).map((pokemon, index) => (
            <PokemonItem key={pokemon.name + index} pokemon={pokemon}/>
            ))
            :
            <div>Loading...</div>
          }
      </div>
    </div>
  )
}

export default TypePage