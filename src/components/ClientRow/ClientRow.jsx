import React from 'react'
import {FaTrash} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import { DELETE_CLIENT, GET_CLIENTS } from '../../query/clientQuery';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import UpdateClient from '../UpdateClient/UpdateClient';
import {GET_PROJECTS } from '../../query/projectQuery';
function ClientRow({client}) {
    const {name, email, phone, id} = client;

    //delete client gql
    const [deleteClient] = useMutation(DELETE_CLIENT,{
        variables: { id: id },
        refetchQueries:[{query: GET_CLIENTS},{query: GET_PROJECTS}]
    });


     //delete client handler
     const deleteAlert = (name)=>{
        confirmAlert({
            title: 'Delete',
            message: `Are you sure to do ${name}`,
            buttons: [
              {
                label: 'Yes',
                onClick: ()=> {
                  deleteClient();
                }
              },
              {
                label: 'No',
              }
            ]
        })
    }

  return (
    <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
            <UpdateClient client={client}/>
            <button className='btn btn-danger btn-sm' style={{marginLeft:"10px"}} onClick={()=> deleteAlert(name)}>
                <FaTrash />
            </button>
        </td>
  </tr>
  )
}

export default ClientRow