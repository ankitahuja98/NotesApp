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
    const [scrollableModal, setScrollableModal] = useState(false);
    const [view_scrollableModal, setview_scrollableModal] = useState(false);
    const [input, setinput] = useState("");
    const [additm, setadditm] = useState([]);
    const [DltAllBtnState, setDltAllBtnState] = useState('none');
    const [comple_Btn, setcomple_Btn] = useState({
        color: "grey",
        backgroundColor: "white"
    })
    const [yourlist_heading, setyourlist_heading] = useState("none");
    const [editModal, seteditModal] = useState("");
    const [edit_Id, setedit_Id] = useState(null);
    const [view_item, setview_item] = useState(null);

    const toggleOpen = () => {
        setCentredModal(!centredModal);
    }

    const inputChange = (event) => {
        setinput(event.target.value)
    }

    const additem = () => {
        if (input === "") {
            alert("Please Enter the List Item");
        } else {
            // jab input ko empty array mai store krwa rha hu tab uske sath uski ek id bhi store krwa rha hu
            const addallitem = { id: new Date().getTime().toString(), name: input }
            // new input ke sath sath usme jo bhi store data hai usse bhi le rha hu ...additm krke 
            setadditm([addallitem, ...additm]);

            setinput("");
            setDltAllBtnState('block')
            setyourlist_heading('block')

        }
    }


    // delete item function
    // onclick event pe ek function call kia hai jo notes ki index leke ayega yaha per 
    // yha id mai vo item ki index store hogi.

    const deleteItem = (id) => {
        // id vo niche se leke aa rha hai
        //or index additem mai jo bhi array hai unka index id bn gya
        const dltitemarray = additm.filter((value) => {
            return (value.id !== id);
        })
        setadditm(dltitemarray);
        // console.log(additm.length-1)
        if (additm.length === 1) {
            setDltAllBtnState('none');
            setyourlist_heading('none')
        }
    }

    const deleteAll = () => {
        setadditm([])
        setDltAllBtnState('none');
        toggleOpen();
        setyourlist_heading('none')
    }

    const edit_Item = (id) => {

        const edit_item = additm.find((value) => {
            return (value.id === id)
        });
        seteditModal(edit_item.name);
        setedit_Id(id);
    }

    const update_item = () => {
        setadditm(additm.map((value) => {
            if (value.id === edit_Id) {
                // ...value mai us particular entry ki baat ho rhi hai yha per ek id or value ayegi
                return { ...value, name: editModal }
            }
            // or yeh wale value mai baki jitni ibhi entry hai vo sb ayegi
            return value;
        }))

        setScrollableModal(!setScrollableModal)
        setedit_Id(null)
    }
    const view_Item = (name) => {
        setview_item(name)
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
                        <Tooltip title="Add Item">
                            <i className="fa-solid fa-plus addicon" onClick={additem} />
                        </Tooltip>
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
                            <h3 style={{ display: `${yourlist_heading}` }}>Your's List</h3>
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
                    {/* yha pe additm mai jo bhi store hoga vo sb value ke andr aajyega */}
                    {additm.map((value) => {
                        return (

                            <div className="col-12 col-md-6 col-lg-4" key={value.id} >

                                <div className='show_list'>
                                    <div>
                                        <p className='showitem_p'>{value.name}</p>
                                    </div>
                                    <Tooltip title="Mark as Completed">
                                        <i className="fa-solid fa-check" style={{ color: `${comple_Btn.color}`, backgroundColor: `${comple_Btn.backgroundColor}` }} onClick={() => {
                                            setcomple_Btn({
                                                color: "white",
                                                backgroundColor: "green"
                                            });
                                        }}></i>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <i className="fa-solid fa-trash" onClick={() => deleteItem(value.id)}></i>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <i className="fa-solid fa-pen-to-square" onClick={() => {
                                            setScrollableModal(!scrollableModal);
                                            edit_Item(value.id);

                                        }}></i>
                                    </Tooltip>
                                    <Tooltip title="View">
                                        <i className="fa-regular fa-eye" onClick={() => {
                                            setview_scrollableModal(!view_scrollableModal);
                                            view_Item(value.name);
                                        }}></i>
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

            {/* Edit items Modal starts */}
            <MDBModal open={scrollableModal} setOpen={setScrollableModal} tabIndex='-1'>
                <MDBModalDialog scrollable>
                    <MDBModalContent>
                        <MDBModalHeader className='MDBModalHeader'>
                            <MDBModalTitle className='fw-bolder alert'>Edit Item</MDBModalTitle>
                            <button
                                className='btn-close'
                                color='none'
                                onClick={() => setScrollableModal(!scrollableModal)}
                            ></button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <textarea className='editModal_txtarea' type="text" style={{textAlign:"justify"}} value={editModal} onChange={(event) => {
                                seteditModal(event.target.value);
                            }}></textarea>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className='btn btn-secondary' color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
                                Close
                            </button>
                            <button className='btn btn-primary' onClick={update_item}>Update Item</button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* Edit items Modal ends */}

            {/* view items Modal starts */}
            <MDBModal open={view_scrollableModal} setOpen={setview_scrollableModal} tabIndex='-1'>
                <MDBModalDialog scrollable>
                    <MDBModalContent>
                        <MDBModalHeader className='MDBModalHeader'>
                            <MDBModalTitle className='fw-bolder alert'>View Item</MDBModalTitle>
                            <button
                                className='btn-close'
                                color='none'
                                onClick={() => {
                                    setview_scrollableModal(!view_scrollableModal);
                                    setview_item(null);
                                }}></button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p style={{textAlign:"justify"}}>{view_item}</p>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* view items Modal ends */}

        </div>

    )
}

export default Todo
