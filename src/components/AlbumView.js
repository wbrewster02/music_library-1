// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/song/${id}` //url to get artist data
            const response = await fetch(API_URL)
            const data = await response.json()
            const songs = data.results.filter(item => item.kind === 'song')
            setAlbumData(songs)
        }

        
        fetchData()
    })

    const display = albumData && albumData.map(song => {
        return (
            <div key={song.trackId}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        <>
            {display}
        </>
    )
}

export default AlbumView