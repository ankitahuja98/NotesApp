import React from 'react'
import headericon from '../Images/Todo icon.png'

const Todo = () => {
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
                        <input type='text' placeholder='Enter the List Item' />
                        <i className="fa-solid fa-plus" />
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
            </div>
            {/* display list heading ends */}

            {/* todo list starts */}

            <div className='container'>
                <div className="row">

                    {/* list start */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='show_list'>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eos soluta ullam quam sint cumque culpa ut eum quae illo, illum iure doloribus mollitia hic dolores sequi unde nobis asperiores iste veritatis, atque nisi tempora debitis fugiat. Et omnis, cum architecto dolorum dolore veniam nulla, consequuntur voluptates, consequatur provident fuga?</p>
                            </div>
                            <i className="fa-solid fa-check"></i>
                            <i className="fa-solid fa-trash"></i>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                    </div>
                    {/* list ends */}


                </div>
            </div>
            {/* todo list ends */}


            {/* display todo list ends */}


        </div>

    )
}

export default Todo
