import React from 'react'
import { AddClientModal, Client, Project } from '../../components'
import AddProject from '../../components/AddProject/AddProject'



function Home() {
  return (
    <>
        <AddClientModal/>
        <AddProject/>
        <Project/> 
        <Client/>
    </>
  )
}

export default Home