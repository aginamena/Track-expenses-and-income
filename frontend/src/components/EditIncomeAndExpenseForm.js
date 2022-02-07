import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';

function EditIncomeAndExpenseForm(props) {
    const { id } = useParams();
    const backend_server_connection = process.env.REACT_APP_BACKEND_SERVER_CONNECTION;
    const history = useHistory();
    const [data, setData] = useState();
    function handleSubmit(event) {
        event.preventDefault();
        const endPoint = props.isExpense ? "expense/exId/" + id : "income/incId/" + id;
        const description = document.querySelector("#formDescription").value;
        const amount = document.querySelector("#formAmount").value;
        const options = {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ description, amount })
        }
        fetch(backend_server_connection + endPoint, options);
        //we don't need the resonse from the server
        history.push("/");

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
        const response = await fetch(backend_server_connection + endPoint, options)
        // console.log(response);
        const data = await response.json();
        setData(data);
    }, [])
    return (
        <>
            {
                !data ? <i className="fas fa-spinner fa-spin fa-5x" style={{ color: "white" }} /> :
                    <form style={{ color: "#839496" }} onSubmit={handleSubmit}>
                        <h3>{props.heading}</h3>
                        <div className="form-group">
                            <label htmlFor="formDescription">Description</label>
                            <input type="text" defaultValue={data.description} className="form-control" id="formDescription" placeholder="Enter description" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="formAmount">Amount</label>
                            <input type="number" defaultValue={data.amount} className="form-control" id="formAmount" placeholder='Enter Amount' min="1" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            }
        </>



    )
}

export default EditIncomeAndExpenseForm
