import React from 'react'
import './client.css'
import {useQuery} from '@apollo/client'
import { GET_CLIENTS } from '../../query/clientQuery'
import ClientRow from '../ClientRow/ClientRow';
import Spaner from '../Spaner/Spaner';

function Client() {
  const {loading, data, error} = useQuery(GET_CLIENTS);

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'name', headerName: 'First name', width: 130 },
  //   {
  //     field: 'phone',
  //     headerName: 'Phone',
  //     width: 140,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email Address',
  //     width: 150,
  //   },

  // ];

  console.log(error);
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
        {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} {...client} />
            ))}
          </tbody>
        </table>
      )}
      </>
    )
  }
  
}

export default Client