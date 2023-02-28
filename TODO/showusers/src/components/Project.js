import React from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`project/${project.id}`}>{project.project_name}</Link>
            </td>
            <td>{project.repository_url}</td>
            <td>{project.users}</td>
        </tr>
    )
    }

const ProjectList = ({projects}) => {
        return (
            <table>
               <thead>
                  <tr>
                    <th>*ID*</th>
                    <th>*Project name*</th>
                    <th>*URL*</th>
                    <th>*Users*</th>
                  </tr>
             </thead>
             <tbody>                    
                    {projects.map((project) => <ProjectItem project={project} />)}
             </tbody>
            </table>
            )
        }



export default ProjectList 