import { gql } from "@apollo/client";

const  GET_PROJECTS = gql`
    query getProjects{
        projects{
            id
            name
            description
            status
        }
    }
` 
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
  `

const  DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!){
        deleteProject(id: $id){
            id
            name
        }
    } 
`

const ADD_PROJECT =   gql`
    mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!){
        addProject(name: $name, description: $description, status: $status, clientId: $clientId){
            id
            name
            description
            status
        }
    }
`
const UPDATE_PROJECT = gql`
    mutation updateProject($name: String!, $description: String!, $status: ProjectStatusUpdate){
        updateProject(name: $name, description: $description, status: $status){
            id
            name
            description
            status
        }
    }
`
export {GET_PROJECTS, DELETE_PROJECT, GET_PROJECT, ADD_PROJECT, UPDATE_PROJECT};