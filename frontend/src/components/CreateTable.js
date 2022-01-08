import React from 'react'
import "../styles/CreateTable.scss";

function CreateTable(props) {
    // only me the user can edit the values here but the admin can see them but can't edit nor delete theem
    return (
        <table className='table' id="createTable">
            <thead>
                <th scope="row">Description</th>
                <th scope="row">Amount</th>
                <th scope="row">Date</th>
            </thead>
            <tbody>
                {
                    props.data.map((item, index) => (
                        <tr key={index} className='newTableRow'>
                            <td>{item.description}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CreateTable
