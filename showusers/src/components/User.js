import React from "react";
import "../App.css";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.user_name}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
    }

const UserList = ({users}) => {
        return (
            <table>
               <thead>
                  <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
             </thead>
             <tbody>
                    {users.map((user) => <UserItem user={user} />)}
             </tbody>
            </table>
            )
        }


export default UserList