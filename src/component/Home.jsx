import React, { useEffect, useState } from 'react'
import { fetchData } from '../api'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(()=> {
    fetchData().then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div className='my-5'>
      <h1>Post Listing</h1>
      <ul>
        {data.map((item) => {
          return <li key={item.id}>{item.title}</li>

        })}
      </ul>
    </div>
  )
}

export default Home
