import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SearchBar } from '..'

const Navbar = () => {
  const [typeList, setTypeList] = useState(null)

  useEffect(()=> {
    fetch('https://pokeapi.co/api/v2/type/')
      .then(res => res.json())
      .then(data => setTypeList(data.results))
  }, [])

  return (
    <div className='bg-primary navbar'>
      <div className="container flex flex-between text-white">
        <Link to={'/'}>
          <span className='fw-7 fs-32'>VitePokedex</span>
        </Link>
        <SearchBar />
        <div className='fw-5 flex links'>
          <span className='type-label link'>
            Types
            <div className='type-list'>
            {
              typeList && typeList.slice(0,-2).map(type => (
                <Link to={`/type/${type.name}`} key={type.name} className='w-100 text-capitalize type-list-item'>
                  {type.name}
                </Link>
              ))
            }
            </div>
          </span>
          <Link to={'/random'} className={'link'}>Get Random</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar