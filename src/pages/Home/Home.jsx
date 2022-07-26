import React from 'react'
import { AddClientModal, Client, Project } from '../../components'
import AddProject from '../../components/AddProject/AddProject'



function Home() {
  return (
    <>
        <div className='d-flex'>
            <div className='me-3'>
               <AddClientModal/>
            </div>
            <div>
              <AddProject/>
            </div>
        </div>
        <Project/> 
        <Client/>
    </>
  )
}

export default Home