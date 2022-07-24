import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_PROJECTS } from '../../query/projectQuery'
import Spaner from '../Spaner/Spaner';
import ProjectCard from '../ProjectCard/ProjectCard';
function Project() {
    const {loading, error, data} = useQuery(GET_PROJECTS);

    if (loading) return <Spaner/>
    else if (error) return <p>Something is worng</p>

    else{
        return (
            <>
            {
                data.projects.length>0? (
                    <div className='row'>
                        {
                            data.projects.map(project => <ProjectCard key={project.id} {...project}/>)
                        }
                    </div>
                ):(
                    <p>are no project</p>
                )
            }
            </>
        )
    }
  
}

export default Project