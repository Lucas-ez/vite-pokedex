import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, PokemonPage, RandomPage, TypePage } from './pages'
import { Navbar } from './components'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/pokemon/:name' element={<PokemonPage/>}/>
          <Route path='/type/:name' element={<TypePage/>}/>
          <Route path='/random' element={<RandomPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
