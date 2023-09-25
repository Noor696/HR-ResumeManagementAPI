import React, { useContext, useEffect, useState } from 'react'
import './Candidates.css'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios'
import AuthContext from '../context/AuthContext';
import DownloadFileModal from '../components/Modals/DownloadFileModal';


function Candidates() {
  const [candidateList, setCandidateList] = useState('')
  let {user, authTokens, logoutUser} = useContext(AuthContext)

  useEffect(()=>{
    getCandidateList()
  },[])

  // axios.get(url, auth);
  console.log('authTokens',authTokens)
  const getCandidateList = async () => {
    let auth = { headers: { Authorization: `Bearer ${authTokens.access}` } };
    try{
      const responce = await axios.get(`http://127.0.0.1:8000/candidate/list/`,
      auth
      );
      setCandidateList(responce.data);
      // setIsLoading(false);
      console.log(responce.data)
      
    }catch (error){
      console.error('Error fetching Candidates Data:', error);
    }
  }

  return (
    <div className='candidate-container'>
      <div className='Can-header'>
          <div className='Can-text'>Candidate Table</div>
          <div className='Can-underline'></div>
      </div>

      <div className='table-container'>
      <Table hover className='table-container'>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Date Of Birth</th>
            <th>Years Of Experience</th>
            <th>department</th>
            <th>resume</th>
            <th>Download resume</th>
          </tr>
        </thead>
        <tbody>
          {candidateList.length > 0 ? (
            candidateList.map((candidate, indx)=> (
              <tr key={indx} style={{color:'gray'}}>
                <td style={{color:'#242424'}}>{candidate.full_name}</td>
                <td>{candidate.date_of_birth}</td>
                <td>{candidate.years_of_experience}</td>
                <td>{candidate.department}</td>
                <td>{candidate.resume}</td>
                <td><DownloadFileModal /></td>
              </tr>
            ))
          ):(
          <tr>
            <td colSpan="5">No data</td>
          </tr>
          )}
          
        </tbody>

      </Table>
      </div>

    </div>
  )
}

export default Candidates