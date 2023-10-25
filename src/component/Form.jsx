import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import Delete from '../assets/delete.png'
import Edit from '../assets/edit.png'

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        desc: ''
    })
    const [editFormData, setEditFormData] = useState({
        id: null,
        title: '',
        desc: ''
      });
    const [isEditing, setIsEditing] = useState(false);
    const [submittedPosts, setSubmittedPosts] = useState(JSON.parse(localStorage.getItem('list')) || []);

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(submittedPosts))
    }, [submittedPosts])

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
            axios
            .post('https://jsonplaceholder.typicode.com/posts', formData)
            .then((res) => {
              console.log(res)
              setSubmittedPosts((prevSubmittedPosts) => [...prevSubmittedPosts, res.data]);
            });
  
            setFormData({ title: '',
            desc: ''})
        }
        

      const handleDelete = (id) => {
        const updatedData = submittedPosts.filter((item) => item.id !== id)
        setSubmittedPosts(updatedData)
        // axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        //   .then(() => {
        //     setSubmittedPosts((prevSubmittedPosts) =>
        //       prevSubmittedPosts.filter((item) => item.id !== id)
        //     );
        //   })
        //   .catch((error) => {
        //     console.error('Error deleting post:', error);
        //   });
      };

      const handleEdit = (item) => {
        setEditFormData({
          id: item.id,
          title: item.title,
          desc: item.desc
        });
        setIsEditing(true);
    }
 
    const handleUpdate = () => {
        axios
        .put(`https://jsonplaceholder.typicode.com/posts/${editFormData.id}`, editFormData)
        .then((res) => {
          setIsEditing(false);
          setEditFormData({
            id: null,
            title: '',
            desc: ''
          });
        })
        .catch((error) => {
          console.error('Error updating post:', error);
        });
    }
 
  return (
    <>
    <div>
  {isEditing ? (
    // Edit mode
    <div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Title"
          name="title"
          value={editFormData.title}
          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name="desc"
          value={editFormData.desc}
          onChange={(e) => setEditFormData({ ...editFormData, desc: e.target.value })}
        ></textarea>
      </div>
      <button type="button" className="btn btn-outline-primary" onClick={handleUpdate}>
        Update
      </button>
    </div>
  ) : (
    // Display mode
    <div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )}
</div>

    <ul className='my-3'>
        {submittedPosts.map((item) => (
            <div className='parent' key={item.id}>
                <div className='info'>
                    <h1>{item.title}</h1>
                    <p>{item.desc}</p>
                </div>
            <div className='button my-3'>
                <img className='edit mx-3' style={{width: '30px', height:'30px', cursor:'pointer'}} src={Edit} alt="Edit"
                 onClick={()=> handleEdit (item)}/>

                <img style={{width: '30px', height:'30px', cursor:'pointer'}} src={Delete} alt="Delete" onClick={() => handleDelete(item.id)}/>
            </div>
            <hr />
            </div>
        ))}
    </ul>
    </>
  )
}

export default Form
