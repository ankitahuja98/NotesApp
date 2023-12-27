import React, { useState } from 'react'
import headericon from '../Images/Todo_icon.png'
import Tooltip from '@mui/material/Tooltip';


const Todo = () => {
    const [input, setinput] = useState("");
    const [additm, setadditm] = useState([]);

    // function Capitalize(str) {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // }

    const inputChange = (event) => {
        setinput(event.target.value)
    }

    const additem = () => {
        if (input === "") {
            return 0;
        } else {
            setadditm([input, ...additm]);
            setinput("");
        }
    }
    // delete item function
    // onclick event pe ek function call kia hai jo notes ki index leke ayega yaha per 
    // yha id mai vo item ki index store hogi.
    const deleteItem = (id) => {
        // id vo niche se leke aa rha hai
        //or index additem mai jo bhi array hai unka index id bn gya
        const dltitemarray = additm.filter((value, index) => {
            return (index !== id);
        })
        setadditm(dltitemarray)
    }

    const deleteAll = () => {
        setadditm([])
    }
    return (
        <div className='todo_body'>

            {/* header start */}
            <div className='header mt-1'>
                <h1 className='text-decoration-underline'>Todo List
                    <img className='header_img' src={headericon} alt='Todo Icon' /></h1>
            </div>
            {/* header ends */}

            {/* input bar starts */}
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className='inputDiv d-flex align-items-center'>
                        <input type='text' placeholder='Enter the List Item' value={input} onChange={inputChange} />
                        <i className="fa-solid fa-plus" onClick={additem} />
                    </div>
                </div>
            </div>
            {/* input bar ends */}

            {/* display todo list starts */}

            {/* display list heading start */}
            <div className='container'>
                <div className="row">
                    <div className="col-12 showItem">
                        <div className='showlist_heading text-start'>
                            <h3>Your's List</h3>
                            <button id='ongoingBtn' className='btn btn-primary' type='submit' >Ongoing</button>
                            <button id='completedBtn' className='btn btn-success' type='submit' >Completed</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <button className='btn btn-danger my-4' onClick={deleteAll}>Delete All</button>
                    </div>
                </div>
            </div>
            {/* display list heading ends */}

            {/* todo list starts */}

            <div className='container'>
                <div className="row">

                    {/* list start */}
                    {additm.map((value, index) => {
                        return (

                            <div className="col-12 col-md-6 col-lg-4" key={index} >

                                <div className='show_list'>
                                    <div>
                                        <p className='showitem_p'>{value}</p>
                                    </div>
                                    <Tooltip title="Mark as Completed">
                                        <i className="fa-solid fa-check"></i>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <i className="fa-solid fa-trash" onClick={() => deleteItem(index)}></i>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Tooltip>
                                </div>
                            </div>

                        )
                    })}
                    {/* list ends */}

                </div>
            </div>
            {/* todo list ends */}


            {/* display todo list ends */}


        </div>

    )
}

export default Todo
