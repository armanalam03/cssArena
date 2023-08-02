import React from 'react'
import '../styles/Sidebar.css'

export default function Sidebar({setShowForm}) {

  return (
    <div className='home_sidebar'>
      <div className="tabs">
        <span className="tab selected">
          <span className="slash">/</span>
          <span className="tab_name">arenas</span>
        </span>
        <span className="tab" onClick={()=>setShowForm(true)}>
          <span className="slash">/</span>
          <span className="tab_name">join_arena</span>
        </span>
      </div>
    </div>
  )
}
