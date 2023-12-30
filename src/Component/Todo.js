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
    const [input, setinput] = useState({
        title: "",
        content: ""
    });
    const [additm, setadditm] = useState([]);
    const [DltAllBtnState, setDltAllBtnState] = useState('none');
    const [yourlist_heading, setyourlist_heading] = useState("none");
    const [editModal, seteditModal] = useState({
        title: "",
        content: ""
    });
    const [edit_Id, setedit_Id] = useState(null);
    const [view_item, setview_item] = useState({
        title: "",
        content: ""
    });


    const toggleOpen = () => {
        setCentredModal(!centredModal);
    }

    const inputChange = (event) => {
        // const value = event.target.value;
        // const name = event.target.name;

        const { value, name } = event.target;

        setinput((oldvalue) => {
            return { ...oldvalue, [name]: value };
        });
    }
    const edit_onchange = (event) => {
        const { value, name } = event.target;

        // console.log("value is " + value)
        // console.log("name is " + name)
        seteditModal((oldvalue) => {
            return { ...oldvalue, [name]: value };
        });
    }

    const additem = () => {
        if (input.title === "" && input.content === "") {
            alert("Please Enter Title and Note");
        } else if (input.title === "") {
            alert("Please Enter Title");
        } else if (input.content === "") {
            alert("Please Enter Note");
        }
        else {
            // jab input ko empty array mai store krwa rha hu tab uske sath uski ek id bhi store krwa rha hu
            const addallitem = { id: new Date().getTime().toString(), title: input.title, content: input.content }
            // new input ke sath sath usme jo bhi store data hai usse bhi le rha hu ...additm krke 
            setadditm([addallitem, ...additm]);

            setinput({
                title: "",
                content: ""
            });
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
        seteditModal({
            title: edit_item.title,
            content: edit_item.content
        });
        setedit_Id(id);
    }

    const update_item = () => {

        setadditm(additm.map((value) => {
            if (value.id === edit_Id) {
                // ...value mai us particular entry ki baat ho rhi hai yha per ek id or value ayegi
                return { ...value, title: editModal.title, content: editModal.content }
            }
            // or yeh wale value mai baki jitni ibhi entry hai vo sb ayegi
            return value;
        }))

        setScrollableModal(!setScrollableModal)
        setedit_Id(null)
    }
    const view_Item = (value) => {
        setview_item({
            title: value.title,
            content: value.content
        })
    }

    return (
        <div className='todo_body'>

            {/* header start */}
            <div className='col-12 inputdiv_main'>
                <div className='header mt-1'>
                    <h1 className='text-decoration-underline' style={{ color: 'white' }}>Notes App
                        <img className='header_img' src={headericon} alt='Todo Icon' /></h1>
                </div>
            </div>
            {/* header ends */}

            {/* input bar starts */}
            <div className='col-12 inputdiv_main'>
                <div className='d-flex justify-content-center'>
                    <div className="d-flex justify-content-center" style={{ width: '85%' }}>
                        <div className='inputDiv col-12 d-flex flex-column justify-content-center'>
                            <input className='title' type='text' placeholder='Title' name="title" value={input.title} onChange={inputChange}></input>
                            <textarea className='notesinput' row='5' type='text' name="content" placeholder='Enter the Note' value={input.content} onChange={inputChange} />


                            <div className="col-12">
                                <div className='additmDiv'>
                                    <Tooltip title="Add Item">
                                        <i className="fa-solid fa-plus addicon" onClick={additem} />
                                    </Tooltip>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
            {/* input bar ends */}

            {/* display todo list starts */}

            <div className='col-12 existing_notes_div'>
                {/* display list heading start */}
                <div className='container'>
                    <div className="row mt-3">
                        <div className="col-12 showItem">
                            <div className='showlist_heading text-start'>
                                <h3 style={{ display: `${yourlist_heading}` }}>Your's Notes</h3>
                            </div>
                            <div className='DltAllBtn'>
                                <button className='btn btn-danger my-4' style={{ display: `${DltAllBtnState}` }} onClick={toggleOpen}>Delete All</button>
                            </div>
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
                                            <p className='showitem_title'>{value.title}</p>
                                            <p className='showitem_p'>{value.content}</p>
                                        </div>
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
                                                view_Item(value);
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
            </div>

            {/* delete All Modal start */}
            <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent className='MDBModalContent_DltAll'>
                        <MDBModalHeader className='MDBModalHeader_DltAll'>
                            <MDBModalTitle className='fw-bolder alert_DltAll'>Alert!</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='MDBModalBody_DltAll'>
                            <p className='fw-bolder'>
                                Are you sure you want to Delete all the Notes.
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter className='MDBModalFooter_DltAll'>
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
                            {/* <MDBModalTitle className='fw-bolder alert'>Edit Item</MDBModalTitle> */}
                            <button
                                className='btn-close'
                                color='none'
                                onClick={() => setScrollableModal(!scrollableModal)}
                            ></button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <h2 style={{ paddingLeft: '1rem', color: '#090986' }}>Title</h2>
                            <textarea className='editModal_txtarea_title' type="text" style={{ textAlign: "justify" }} name='title' value={editModal.title} onChange={edit_onchange}></textarea>
                            <h2 className='mt-5' style={{ paddingLeft: '1rem', color: '#090986' }}>Note</h2>
                            <textarea className='editModal_txtarea_content' type="text" style={{ textAlign: "justify" }} name='content' value={editModal.content} onChange={edit_onchange}></textarea>
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
                        <MDBModalHeader className='MDBModalHeader_view'>
                            {/* <MDBModalTitle className='fw-bolder alert'>View Item</MDBModalTitle> */}
                            <button
                                className='btn-close'
                                color='none'
                                onClick={() => {
                                    setview_scrollableModal(!view_scrollableModal);
                                    setview_item({
                                        title: "",
                                        content: ""
                                    });
                                }}></button>
                        </MDBModalHeader>
                        <MDBModalBody className='MDBModalBody_view'>
                            <p className='fw-bolder MDBModalBody_title' style={{ textAlign: "justify" }}>{view_item.title}</p>
                            <p style={{ textAlign: "justify" }}>{view_item.content}</p>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* view items Modal ends */}

        </div>

    )
}

export default Todo
