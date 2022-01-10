import React from 'react'
import "../styles/CreateTable.scss";
import baseURL from '../utils/baseUrl';
function CreateTable(props) {
    async function DeleteItem(id) {
        const options = {
            method: "delete",
            headers: {
                "content-type": "application/json"
            }
        }
        if (props.isExpense) {
            console.log(id);
            console.log(baseURL + "expense/" + id)
            await fetch(baseURL + "expense/" + id, options)
            // we don't need the response
        } else {
            await fetch(baseURL + "income/" + id, options)
        }
        props.refresh();
    }
    // only me the user can edit the values here but the admin can see them but can't edit nor delete theem
    return (
        <table className='table' id="createTable">
            <thead>
                <th scope="row">Description</th>
                <th scope="row">Amount</th>
                <th scope="row">Date</th>
                <th scope="row">Edit</th>
                <th scope="row">Delete</th>

            </thead>
            <tbody>
                {
                    props.data.map((item, index) => (
                        <tr key={index} className='newTableRow'>
                            <td>{item.description}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                            <td><i className="fas fa-edit" style={{ color: "yellow" }} id={item._id} /></td>
                            <td><i className="fas fa-trash-alt" onClick={() => DeleteItem(item._id)} style={{ color: "red" }} id={item._id} /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CreateTable
