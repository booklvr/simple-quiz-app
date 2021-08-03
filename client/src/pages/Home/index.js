import React, {useEffect} from 'react'
import { HomeContainer } from './styled'
import axios from 'axios';

const Home = () => {

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/test')
      console.log(response)
      const postsData = await response.json();
      console.log(postsData)
    }
    

    getData();
  })

  return (
    <HomeContainer>
      
    </HomeContainer>
  )
}

export default Home
