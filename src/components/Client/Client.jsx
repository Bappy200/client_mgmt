import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_CLIENTS } from '../../query/clientQuery'
import ClientRow from '../ClientRow/ClientRow';
import Spaner from '../Spaner/Spaner';

function Client() {
  const {loading, data, error} = useQuery(GET_CLIENTS);

  if(loading){
    return <Spaner/>
  }
  else if(error){
    return <p>Something is worring</p>
  }
  else{
    console.log(data.clients);
    return (
      <>
        <h2 className='mt-4 mb-2 text-uppercase' >All Clients</h2>
        {!loading && !error && (
        <table className='table table-hover mt-3 mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
      </>
    )
  }
  
}

export default Client