import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const TODOItem = ({ item, deleteTODO }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.text_to_do}</td>
            <td>{item.create_or_update}</td>
            <td>{item.project_name}</td>
            <td>{item.user}</td>            
            <td><button className="btn btn-primary" onClick={() => deleteTODO(item.id)} type="button">Удалить</button></td>
        </tr>
    )
}

const TODOList = ({ items, deleteTODO }) => {
    return (
        <div className="container" >
            <table>
                <thead>
                    <tr>
                        <th>*ID*</th>
                        <th>*Text*</th>
                        <th>*Date of update*</th>
                        <th>*Project name*</th>
                        <th>*User*</th>                        
                        <th>***********</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => <TODOItem item={item} deleteTODO={deleteTODO} />)}
                </tbody>
            </table>
            <Link to='/TODO/create'>Create</Link>
        </div>
    )
}


export default TODOList