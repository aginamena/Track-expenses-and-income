import React from 'react'
import "../styles/CreateTable.scss";
import { Link } from "react-router-dom"
function CreateTable(props) {
    const backend_server_connection = process.env.REACT_APP_BACKEND_SERVER_CONNECTION;
    async function DeleteItem(id) {
        const options = {
            method: "delete",
            headers: {
                "content-type": "application/json"
            }
        }
        if (props.isExpense) {
            await fetch(backend_server_connection + "expense/" + id, options)
            // we don't need the response
        } else {
            await fetch(backend_server_connection + "income/" + id, options)
        }
        props.refresh();
    }
    // only me the user can edit the values here but the admin can see them but can't edit nor delete theem
    return (
        <div id="createTableDiv" className='table-responsive-sm'>
            <table className='table' id="createTable">
                <thead>
                    <tr>
                        <th scope="row">Description</th>
                        <th scope="row">Amount</th>
                        <th scope="row">Date</th>
                        {
                            props.canDelete &&
                            <>
                                <th scope="row">Edit</th>
                                <th scope="row">Delete</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((item, index) => (
                            <tr key={index} className='newTableRow'>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{item.date}</td>
                                {
                                    props.canDelete && <>
                                        <td>
                                            <Link to={props.isExpense ? "editExpense/" + item._id : "editIncome/" + item._id}>
                                                <i className="fas fa-edit" style={{ color: "yellow" }} id={item._id} />
                                            </Link>
                                        </td>
                                        <td><i className="fas fa-trash-alt" onClick={() => DeleteItem(item._id)} style={{ color: "red" }} id={item._id} /></td>
                                    </>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CreateTable
