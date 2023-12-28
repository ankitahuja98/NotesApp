import React, { useState } from 'react'
import headericon from '../Images/Todo_icon.png'
import Tooltip from '@mui/material/Tooltip';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';


const Todo = () => {
    const [centredModal, setCentredModal] = useState(false);
    const [input, setinput] = useState("");
    const [additm, setadditm] = useState([]);

    const toggleOpen = () => {
        setCentredModal(!centredModal);
    }

    const [DltAllBtnState, setDltAllBtnState] = useState('none')

    const inputChange = (event) => {
        setinput(event.target.value)
    }

    const additem = () => {
        if (input === "") {
            return 0;
        } else {
            setadditm([input, ...additm]);
            setinput("");
            setDltAllBtnState('block')
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
        setadditm(dltitemarray);
        // console.log(additm.length-1)
        if (additm.length === 1) {
            setDltAllBtnState('none');
        }
    }

    const deleteAll = () => {
        setadditm([])
        setDltAllBtnState('none');
        toggleOpen();
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
                        <i className="fa-solid fa-plus addicon" onClick={additem} />
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
                            <button id='ongoingBtn' className='btn btn-primary list_btn' type='submit' >Ongoing</button>
                            <button id='completedBtn' className='btn btn-success list_btn' type='submit' >Completed</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <button className='btn btn-danger my-4' style={{ display: `${DltAllBtnState}` }} onClick={toggleOpen}>Delete All</button>
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

            {/* delete All Modal start */}
            <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent className='MDBModalContent'>
                        <MDBModalHeader className='MDBModalHeader'>
                            <MDBModalTitle className='fw-bolder alert'>Alert!</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='MDBModalBody'>
                            <p className='fw-bolder'>
                                Are you sure you want to Delete all the items.
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter className='MDBModalFooter'>
                            <button className='btn btn-danger' onClick={deleteAll}>Delete All</button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* delete all Modal ends */}

            

        </div>

    )
}

export default Todo
