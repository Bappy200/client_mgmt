// import { Alert } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({name, status, id}) {
    

   
  return (
    <div className='sm-col-12 col-4'>
        <div class="card text-black bg-light mb-3" style={{border:"none", boxShadow:"1px 1px 3px #ddd"}}>
            <div class="card-header">Status: {status ? status : 'comming...'}</div>
            <div class="card-body d-flex justify-content-between">
                <div>
                  <h3 class="card-title">{name}</h3>
                </div>
                <Link to={`/project/${id}`}>
                  <button className='btn btn-light'>
                    viwe
                  </button>
                </Link>
            </div>
         </div>
    </div>
  )
}

export default ProjectCard