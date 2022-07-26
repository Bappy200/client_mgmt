import React from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useQuery, useMutation} from "@apollo/client"
import { GET_PROJECT, DELETE_PROJECT, GET_PROJECTS } from '../../query/projectQuery';
import Spaner from '../Spaner/Spaner';
import { confirmAlert } from 'react-confirm-alert';
import {FaTrash} from 'react-icons/fa'
import 'react-confirm-alert/src/react-confirm-alert.css';
import UpdateProject from '../UpdateProject/UpdateProject';


function ProjectDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {loading, error, data} = useQuery(GET_PROJECT, {
    variables: {id: id}
  });
  
  const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables: { id: id },
        update(cache, { data: { deleteProject } }) {
        const { projects } = cache.readQuery({ query: GET_PROJECTS });
        cache.writeQuery({
            query: GET_PROJECTS,
            data: {
            projects: projects.filter((project) => project.id !== deleteProject.id),
            },
        });
    },
    });

    //delete project heandler
    const deleteAlert = (name)=>{
        confirmAlert({
            title: 'Delete',
            message: `Are you sure to do ${name}`,
            buttons: [
              {
                label: 'Yes',
                onClick: ()=> {
                  deleteProject()
                  navigate("/");
                }
              },
              {
                label: 'No',
              }
            ]
        })
    }

    
    if(loading){
      return <Spaner/>
    }
    else if(error){
      return <p>Something is worng</p>
    }
    else{
      return (
      
        <>
          {
            !loading && !error && <div className='d-flex justify-content-center align-item-center'>
              <div className=' bg-light p-5 rounded'>
                  <h3 className='text-uppercase'>{data.project.name}</h3>
                  <h6 className='text-uppercase'>Status : {data.project.status? data.project.status : "comming"}</h6>
                  <p>{data.project.description}</p>
                  {
                    data.project.client && <ul className="list-group mt-6">
                        <li className="list-group-item list-group-item-primary text-uppercase"><h5>client information</h5></li>
                        <li className="list-group-item list-group-item-secondary text-capitalize"><span className='fw-semibold'>Name</span> {data.project.client.name}</li>
                        <li className="list-group-item list-group-item-success"><span className='fw-semibold text-capitalize'>email</span>  {data.project.client.email}</li>
                        <li className="list-group-item list-group-item-info "><span className='fw-semibold text-capitalize'>phone number</span> {data.project.client.phone}</li>
                    </ul>
                  }
                  <div className='d-flex justify-content-end align-item-end mt-4'>
                      <UpdateProject project={data.project}/>
                      <button className='btn btn-danger btn-sm' style={{marginLeft:"1rem"}} onClick={()=> deleteAlert(data.project.name)}>
                          <FaTrash />
                      </button>
                  </div>
              </div>
            </div>
          }
        </>
      )
    }
}

export default ProjectDetails