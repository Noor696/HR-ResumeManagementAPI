import React, { useContext, useEffect, useState } from 'react'
import './Candidates.css'
import { Button, Spinner, Table } from 'react-bootstrap'
import axios from 'axios'
import AuthContext from '../context/AuthContext';
import { BsFillCloudArrowDownFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import DeleteCandidateModal from '../components/Modals/DeleteCandidateModal';


function Candidates() {
  const [candidateList, setCandidateList] = useState('')
  let {user, authTokens, logoutUser} = useContext(AuthContext)
  const [loadingData , setLoadingData] = useState(false)
  const [ reloadData, setReloadData] =useState(false)

  useEffect(()=>{
    getCandidateList()
  },[])

  useEffect(()=>{
    getCandidateList()
  },[reloadData])

  // axios.get(url, auth);
  console.log('authTokens',authTokens)
  const getCandidateList = async () => {
    setLoadingData(true)
    let auth = { headers: { Authorization: `Bearer ${authTokens.access}` } };
    try{
      const responce = await axios.get(`http://127.0.0.1:8000/candidate/list/`,
      auth
      );
      setCandidateList(responce.data);
      console.log('getCandidateList', responce.data)
      setLoadingData(false)
      
    }catch (error){
      console.error('Error fetching Candidates Data:', error);
    }
  }

  const downloadWithAxios =(url,title)=>{
    axios({
      method:'GET',  
      url,
      responseType:"arraybuffer",
      // headers:{Authorization :`Bearer ${authTokens.access}`}
    }) .then((responce)=>{
      forceDownload(responce,title)
    }) .catch((err)=>{
      console.log(err)
    })
  }

  const forceDownload =(responce,title)=>{
     console.log('forceDownload',responce)
     const blob = new Blob([responce.data]);
     const blobUrl = window.URL.createObjectURL(blob);
    //  const url = window.URL.createObjectURL(new Blob([responce.data]))
     const link = document.createElement('a')
     link.href = blobUrl;
     link.download = `${title}.pdf`;
     link.click();
     window.URL.revokeObjectURL(blobUrl);
     toast.success(`Successfully Downloaded ${title} File`)
  }
  return (
    <div className='candidate-container'>
      <div className='Can-header'>
          <div className='Can-text'>Candidate Table</div>
          <div className='Can-underline'></div>
      </div>

      <div className='table-container'>
      {loadingData && <div className='spinner-div'><Spinner animation='border' style={{color:'#ffb609'}} /></div>}
      {!loadingData && <Table hover className='table-container'>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Date Of Birth</th>
            <th>Years Of Experience</th>
            <th>department</th>
            {/* <th>resume</th> */}
            <th>Download resume</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { candidateList.length > 0 ? (
            candidateList.map((candidate, indx)=> (
              <tr key={indx} style={{color:'gray'}}>
                <td style={{color:'#242424'}}>{candidate.full_name}</td>
                <td>{candidate.date_of_birth}</td>
                <td>{candidate.years_of_experience}</td>
                <td>{candidate.department}</td>
                {/* <td>{candidate.resume}</td> */}
                <td>
                  <Button onClick={()=>downloadWithAxios(candidate.resume, candidate.full_name)} variant='light' 
                  style={{color:'#ffb609', fontSize:'20px', marginTop:'-0.1rem'}}>
                    <BsFillCloudArrowDownFill />
                  </Button>
                </td>
                <td><DeleteCandidateModal candidate={candidate} authTokens={authTokens} setReloadData={setReloadData}/></td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan="5">No Candidate Found!</td>
            </tr>

          )}
          
        </tbody>

      </Table>}
      </div>

    </div>
  )
}

export default Candidates