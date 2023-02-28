import React from "react";
import "../App.css";

const TODOItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.text_to_do}</td>
            <td>{item.create_or_update}</td>            
            <td>{item.project_name}</td>
            <td>{item.user}</td>
        </tr>
    )
    }

const TODOList = ({items}) => {
        return (
            <table>
               <thead>
                  <tr>
                    <th>*ID*</th>
                    <th>*Text*</th>
                    <th>*Date of update*</th>                    
                    <th>*Project name*</th>
                    <th>*User*</th>
                  </tr>
             </thead>
             <tbody>                
                    {items.map((item) => <TODOItem item={item} />)}
             </tbody>
            </table>
            )
        }


export default TODOList