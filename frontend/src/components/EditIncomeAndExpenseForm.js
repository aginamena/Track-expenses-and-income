import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import baseURL from '../utils/baseUrl';


function EditIncomeAndExpenseForm(props) {
    const { id } = useParams();
    const [data, setData] = useState();
    function handleSubmit(event) {
        event.preventDefault();
        // const endPoint = props.isExpense ? "expense/exId/" + id : "income/incId/" + id;
    }
    useEffect(async () => {
        const endPoint = props.isExpense ? "expense/" + id : "income/" + id;
        const options = {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        }
        // console.log(baseURL + end)
        const response = await fetch(baseURL + endPoint, options)
        // console.log(response);
        const data = await response.json();
        setData(data);
    }, [])
    // const { id } = useParams();
    // const endPoint = props.isExpense ? "expense/exId/" + id : "income/incId/" + id;
    // const options = {
    //     method: "get",
    //     headers: {
    //         "content-type": "application/json"
    //     }
    // }
    // const response = await fetch(baseURL + endPoint, options)
    // const data = await response.json();
    // console.log(data);
    return (
        <form style={{ color: "#839496" }}>
            <h3>{props.heading}</h3>
            <div className="form-group">
                <label for="formDescription">Description</label>
                <input value="testing" type="text" className="form-control" id="formDescription" placeholder="Enter description" required />
            </div>
            <div className="form-group">
                <label for="formAmount">Description</label>
                <input type="number" className="form-control" id="formAmount" placeholder='Enter Amount' min="0" required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default EditIncomeAndExpenseForm
