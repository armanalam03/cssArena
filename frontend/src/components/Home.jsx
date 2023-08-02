import React, {useState} from 'react'
import '../styles/Home.css'
import Sidebar from './Sidebar'
import ArenasContainer from './ArenasContainer'
import ArenaJoinForm from './ArenaJoinForm'

export default function Home() {
  
  const [showForm, setShowForm] = useState(false)
  return (
    <div className='home_container'>
      <Sidebar setShowForm={setShowForm}/>
      <ArenasContainer />
      {showForm ? <ArenaJoinForm setShowForm={setShowForm} /> : null}
    </div>
  )
}
