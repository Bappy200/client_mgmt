import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {  GET_CLIENT,  UPDATE_CLIENT } from '../../query/clientQuery';
import { FaEdit } from 'react-icons/fa';

export default function UpdateClient({client}) {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const id =  client.id;

  const [updateClient] = useMutation(UPDATE_CLIENT,{
    variables:{id, name, email, phone},
    refetchQueries: [{ query: GET_CLIENT, variables: { id: id } }]
  })


  const onSubmit = (e) => {
    e.preventDefault();  

    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }
      updateClient(id, name, email, phone);
      setName('');
      setEmail('');
      setPhone('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#updateClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaEdit/>
        </div>
      </button>

      <div
        className='modal fade'
        id='updateClientModal'
        aria-labelledby='updateClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='updateClientModalLabel'>
                Update Client
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-secondary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}