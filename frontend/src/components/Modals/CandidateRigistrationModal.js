import { useState } from 'react';
import {Button, Spinner} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../FirstSection.css'
import axios from 'axios';

function CandidateRigistrationModal(props) {

  const handleClose = () => props.setShow(false);

  const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [department, setDepartment ] = useState('');
    const [resume, setResume ] = useState(null);

    const [loading , setloading] = useState(false)

    const handleOnChangeFile=(e)=>{
      const file= e.target.files[0];
      setResume(file)
    }

    const handleCreateResume = (e) => {
      const formData = new FormData();
      formData.append('full_name', fullName );
      formData.append('date_of_birth', dateOfBirth ) ;
      formData.append('years_of_experience', yearsOfExperience  );
      formData.append('department', department);
      formData.append('resume', resume);

        setloading(true)
        e.preventDefault()
        axios.post(`http://127.0.0.1:8000/candidate/create-resume/`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        ) .then((response)=>{
            console.log(response)
            toast.success('Successfuly applied')
        }) .catch((err)=>{
            console.log(err)
            toast.error('Something went wrong')
        }) .finally(()=>{
            setloading(false)
            handleClose()
        })
    }

  return (
    <>

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:'#ffb609'}}>Add Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>

            <Form.Group controlId="fullName" className='mb-3' style={{display:'flex'}}>
                <span style={{margin:'0.5rem'}}>
                    <i class="fa fa-user"></i>
                </span>
                <Form.Control
                required
                size='sm'
                type="text"
                value={fullName}
                placeholder='Full Name'
                onChange={(e) => setFullName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="dateOfBirth" className='mb-3' style={{display:'flex'}}>
                <span style={{margin:'0.5rem'}}>
                    <i class="fas fa-calendar-alt"></i>
                </span>
                <Form.Control
                required
                size='sm'
                type="date"
                value={dateOfBirth}
                // placeholder='Date Of Birth'
                onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="yearsOfExperience" className='mb-3' style={{display:'flex'}}>
                <span style={{margin:'0.5rem'}}>
                    <i className="far fa-clock"></i>
                </span>
                <Form.Control
                required
                size='sm'
                type="number"
                min = {0}
                value={yearsOfExperience}
                placeholder='years Of Experience'
                onChange={(e) => setYearsOfExperience(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="department" className='mb-3' style={{display:'flex'}}>
                    {/* <Form.Label>Role</Form.Label> */}
                    <span style={{margin:'0.5rem'}}>
                        <i className="fas fa-briefcase"></i>
                    </span>
                    <Form.Control
                    required
                    as="select" 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)} 
                    
                    >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                   </Form.Control>
                </Form.Group>

                <Form.Group controlId="resume" className='mb-3' style={{display:'flex'}}>
                <span style={{margin:'0.5rem'}}>
                    <i className="fa fa-file resume"></i>
                </span>
                <Form.Control
                required
                type="file"
                multiple={false}
                // value={resume}
                placeholder='resume'
                onChange={(e) => handleOnChangeFile(e)}
                />
            </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}
        //   id='CloseButton btn'
          style={{backgroundColor:'#242424',
          border: '1px solid #242424',
          padding:'8px 20px',
          borderRadius:"1px" }}
          >
            Close
          </Button>
          <Button onClick={handleCreateResume}
        //   id='REGISTERButton'
          style={{backgroundColor:'#ffb609',
          border: '1px solid #ffb609',
          padding:'8px 20px',
          borderRadius:"1px" }}
          >
            {loading ? 
            <div><Spinner size='sm' animation="border" style={{marginRight:'2px'}}/><span>Register</span></div>: "Register"}
            {/* Save Changes */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CandidateRigistrationModal;