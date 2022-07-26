// import { Alert } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({name, status, id}) {
    

   
  return (
    <div className='col-xl-4 col-md-6 col-sm-12'>
        <div class="card text-black bg-light mb-3" style={{border:"none", boxShadow:"1px 1px 3px #ddd"}}>
            <div class="card-body ">
                <h3 class="card-title text-capitalize">{name}</h3>
                <p>Status <span className='text-uppercase'>{status}</span></p>
                <div className="d-flex justify-content-end align-item-end">
                  <Link to={`/project/${id}`}>
                    <button className='btn btn-info'>
                      viwe
                    </button>
                  </Link>
                </div>
            </div>
         </div>
    </div>
  )
}

export default ProjectCard