import './HomePage.scss'
import { useEffect, useState, useRef, useCallback } from "react"
import { PokemonItem } from './../../components'

const HomePage = () => {
  const LIMIT = 16
  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
      .then(result => result.json())
      .then(data => {
        setPokemonList([...pokemonList, ...data.results])
        setIsLoading(false)
      })
  }, [offset])

  const observer = useRef();
  const lastPokemonItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => (prev < 1400) ? prev + LIMIT : prev);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return (
    <div className='home-page'>
      <div className='container flex flex-center flex-wrap pokemon-list'>
        {
          pokemonList.length > 0
          ?
          pokemonList.map(pokemon => (
            <div key={pokemon.name} ref={lastPokemonItemRef}>
              <PokemonItem pokemon={pokemon}/>
            </div>
            ))
            :
            <div>Loading...</div>
          }
      </div>
    </div>
  )
}

export default HomePage