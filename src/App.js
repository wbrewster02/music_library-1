import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery.js';
import SearchBar from './components/SearchBar';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const API_URL = `https://itunes.apple.com/search?term=${encodeURI(search)}` 
        const response = await fetch (API_URL)
        const data = await response.json()
        console.log(data)
        if(data.results.length > 0){
          setData(data.results)
        }else{
          setMessage('Not Found')
        }
      }
      if (search) fetchData()
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }
    

    return (
      <div>
      {message}
          <Router>
              <Routes>
                  <Route path="/" element={
                      <>
                          <SearchBar handleSearch = {handleSearch}/>
                          <Gallery data={data} />
                      </>
                  } />
                  <Route path="/album/:id" element={<AlbumView />} />
                  <Route path="/artist/:id" element={<ArtistView />} />
              </Routes>
          </Router>
      </div>
  )  
}

export default App