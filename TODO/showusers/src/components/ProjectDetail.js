import React from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";

const ProjectUserTODO = ({item}) => {
    return (
        <li>
            {item.username} ({item.email})
        </li>
    )
}

const ProjectDetalization = ({getProject, item}) => {
    let { id } = useParams();
    getProject(id)
    let users = item.users ? item.users: []
    console.log(id)
    return (
        <div>
            <h1> {item.username} </h1>
                Repository: <a href={item.repository_url}>{item.repository_url}</a>
            <p></p>    
            Users:
                <ol>
                    {users.map((user) => <ProjectUserTODO item={user} />)}
                </ol>

        </div>
    )

}

export default ProjectDetalization