import React from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";


const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`project/${project.id}`}>{project.project_name}</Link>
            </td>
            <td>{project.repository_url}</td>
            <td>{project.users}</td>
            <td><button className="btn btn-primary" onClick={() => deleteProject(project.id)} type="button">Удалить</button></td>
        </tr>
    )
}

const ProjectList = ({ projects, deleteProject }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>*ID*</th>
                    <th>*Project name*</th>
                    <th>*URL*</th>
                    <th>*Users*</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </tbody>
        </table>
    )
}



export default ProjectList 