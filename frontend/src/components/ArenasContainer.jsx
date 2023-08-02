import React, { useEffect, useState } from 'react'
import '../styles/ArenasContainer.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ArenasContainer() {

  const [arenas, setArenas] = useState([])

  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/api/arenas/")
    .then((res) => {
      setArenas(res.data)
    })
  } , [])

  /* const getArenas = () => {
    axios
    .get("http://127.0.0.1:8000/api/arenas/")
    .then((res) => {
      console.log(res.data)
      const data = res.data
      setArenas(data)
    })
  } */

  return (
    <div className='arenas_container'>
      <div className="arenas_container_heading">
        <span className="arenas_container_heading_text">Welcome to the playground. Choose you arena and start your learning battle.</span>
      </div>
      <div className="arenas_tiles_container">
          {/* <Link to="/arena/31" className="arena_tile">
            <img src="https://cssbattle.dev/targets/3@2x.png" className='arena_tile_img'/>
            <span className="arena_tile_id">#321</span>
          </Link> */}
          {
            arenas.map((arena) => {
              return (
                <Link to={"/arena/" + arena.id} className="arena_tile" key={arena.id} /* state={{id: arena.id, url: arena.url}} */>
                  <img src={arena.url} className='arena_tile_img'/>
                  <span className="arena_tile_id">#{arena.id}</span>
                </Link>
              )
            })
          }
        </div>
    </div>
  )
}
