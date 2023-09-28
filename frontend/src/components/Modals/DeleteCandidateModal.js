import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsXLg } from "react-icons/bs";
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

function DeleteCandidateModal(props) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true) ;
  const [loadingDelete , setLoadingDelete] = useState(false)

  const handleDelete = async () => {
    setLoadingDelete(true)
    let auth = { headers: { Authorization: `Bearer ${props.authTokens.access}` } };
    try{
      const responce = await axios.delete(`http://127.0.0.1:8000/candidate/${props.candidate.id}/`,
      auth
      );
      console.log(responce)
      setLoadingDelete(false)
      toast.success('Successfuly Deleted')
      props.setReloadData((current)=>!current)
      handleClose()
      
    }catch (error){
      toast.error('Error Deleting Candidates Data:', error);
      console.log(error)
    }
  }

  return (
    <div>
        <Button variant='light' onClick={handleShow} style={{color:'#ffb609', fontSize:'20px', marginTop:'-0.1rem'}}><BsXLg /></Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {props.candidate.full_name} Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are You Sure you want to delete {props.candidate.full_name} Candidate</p>
                     
        
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:'gray', borderColor:'gray', borderRadius:'1px'}} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{backgroundColor:'#c72b10' , borderColor:'#c72b10', borderRadius:'1px'}} onClick={handleDelete}>
          {loadingDelete ? 
            <div><Spinner size='sm' animation="border" style={{marginRight:'2px'}}/><span>Delete</span></div>: 
            "Delete"}
          </Button>
        </Modal.Footer>


        </Modal>
    </div>
  )
}

export default DeleteCandidateModal