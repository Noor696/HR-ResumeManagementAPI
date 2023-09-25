import React, { useEffect, useState } from 'react'
import './Candidates.css'
import { Table } from 'react-bootstrap'
import axios from 'axios'

function Candidates() {
  const [candidateList, setCandidateList] = useState('')

  useEffect(()=>{
    getCandidateList()
  },[])

  const getCandidateList = async () => {
    try{
      const responce = await axios.get(`http://127.0.0.1:8000/candidate/list/`);
      setCandidateList(responce.data);
      // setIsLoading(false);
      console.log(responce.data)
      
    }catch (error){
      console.error('Error fetching Candidates Data:', error);
    }
  }

  // const getMerchantData = async () => {
  //   try{
  //     const responce = await Axios.get(`/onboarding-team/retrieve-merchants`);
  //     setMerchantList(responce.data);
  //     setIsLoading(false);
  //     // console.log(responce.data)
  //     setresetLoading(false)
      
  //   }catch (error){
  //     console.error('Error fetching Merchant Data:', error);
  //   }
  // }
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
          </tr>
        </thead>
        <tbody>
          {candidateList.length > 0 ? (
            candidateList.map((candidate, indx)=> {
              <tr key={indx}>
                <td>Full Name</td>
                <td>Date Of Birth</td>
                <td>Years Of Experience</td>
                <td>department</td>
                <td>resume</td>

              </tr>
            })
          ):
          (<tr>'no data'</tr>)}
          
        </tbody>

      </Table>
      </div>

    </div>
  )
}

export default Candidates