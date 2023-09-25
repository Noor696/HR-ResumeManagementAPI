import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillCloudArrowDownFill } from "react-icons/bs";

function DownloadFileModal() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fileId = 1; // Replace with the actual file ID you want to download
    axios.get(`http://127.0.0.1:8000/candidate/api/download/${fileId}/`, { responseType: 'blob' })
      .then((response) => {
        // Create a blob URL from the response data
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        setFileData(url);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  }, []);


  return (
    <div>
        <Button variant='light' onClick={handleShow} style={{color:'#ffb609', fontSize:'20px'}}><BsFillCloudArrowDownFill /></Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download File</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <div>
      {fileData && (
        <a href={fileData} download="downloaded_file.txt">
          Download File
        </a>
      )}
    </div>            
        
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}


        </Modal>
    </div>
  )
}

export default DownloadFileModal


// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function FileDownloadComponent() {
//   const [fileData, setFileData] = useState(null);

//   useEffect(() => {
//     const fileId = 1; // Replace with the actual file ID you want to download
//     axios.get(`/api/download/${fileId}/`, { responseType: 'blob' })
//       .then((response) => {
//         // Create a blob URL from the response data
//         const blob = new Blob([response.data]);
//         const url = window.URL.createObjectURL(blob);
//         setFileData(url);
//       })
//       .catch((error) => {
//         console.error('Error downloading file:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {fileData && (
//         <a href={fileData} download="downloaded_file.txt">
//           Download File
//         </a>
//       )}
//     </div>
//   );
// }

// export default FileDownloadComponent;