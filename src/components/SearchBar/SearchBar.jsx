import './SearchBar.scss'
import Autosuggest from "react-autosuggest"
import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'

const SearchBar = () => {

  const navigate = useNavigate()
  const [apiData, setApiData] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [inputValue, setInputValue] = useState('')
  

  useState(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then(res => res.json())
      .then(data => setApiData(data.results))
  }, [])

  const filtrarPokemons = (value)=>{
    const iValue = value.trim().toLowerCase();
    const iLength = iValue.length;

    if(iLength < 1) return []
  
    const filtrados = apiData.filter( pokemon => {
      if(pokemon.name.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(iValue)){
        return pokemon;
      }
    });
  
    return filtrados;
  }

  const resetInput = () => {
    setInputValue('')
    setFilteredPokemons([])
  }

  const handleChange = (e) => {
    setFilteredPokemons(filtrarPokemons(e.target.value))
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(filteredPokemons[0]) 
      navigate(`/pokemon/${filteredPokemons[0].name}`)
  }

  return (
    <form onSubmit={handleSubmit} className='flex search-bar'>
      <div>
        <input className='fs-20 fw-5' type="text" onChange={handleChange} value={inputValue} placeholder='search...'/>
        <ul className='bg-primary'>
          {
            filteredPokemons.slice(0, 5).map(pokemon => (
              <li key={pokemon.name} className='text-capitalize w-100'>
                <Link to={`/pokemon/${pokemon.name}`} className='w-100'><div onClick={resetInput}>{pokemon.name}</div></Link>
              </li>
              ))
            }
        </ul>
      </div>
      <button className='btn btn-primary'>
        <i className="fa-solid fa-magnifying-glass text-white fs-24"></i>
      </button>
    </form>
  )
}

export default SearchBar