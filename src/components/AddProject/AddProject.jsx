import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT, GET_PROJECTS } from '../../query/projectQuery';
import { GET_CLIENTS } from '../../query/clientQuery';


export default function AddProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClintId] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId},   
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  }); 

  //get clients
  const {loading, error, data} = useQuery(GET_CLIENTS)
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '' || clientId === '') {
      return alert('Please fill in all fields');
    }

    console.log(description);

    addProject(name, description, status, clientId);

    setName('');
    setDescription('');
    setStatus('new');
    setClintId('')
  };

  if (loading) return null
  if (error) return 'Something Went Wrong';
  return (
    <>
    {
      !loading && !error && (
        <>
      <button
        type='button'
        className='btn btn-info'
        data-bs-toggle='modal'
        data-bs-target='#addProjectModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Project</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addProjectModal'
        aria-labelledby='addProjectModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addProjectModalLabel'>
                Add Project
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
                  <label className='form-label'>Descption</label>
                  <input
                    type='text'
                    className='form-control'
                    id='descptionId'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <select
                        className='form-select' 
                        value={status}        
                        onChange={(e)=> setStatus(e.target.value)}
                        id="statusId"    
                    >
                        <option value="">Selece Status</option>
                        <option value="new">Not Stated</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                  </select>
                  
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Client</label>
                    <select
                        className='form-select' 
                        value={clientId}        
                        onChange={(e)=> setClintId(e.target.value)}
                        id="clientId"    
                    >
                        <option value="">Selece Client</option>
                        {
                          data.clients.map((client)=>(
                            <option key={client.id} value={client.id}>{client.name}</option>
                          ))
                        }
                  </select>
                  
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
      ) 
    }
    </>
  );
}