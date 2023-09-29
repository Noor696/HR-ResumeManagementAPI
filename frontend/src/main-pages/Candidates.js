import React, { useContext, useEffect, useState } from 'react'
import './Candidates.css'
import { Button, Spinner, Table, Form } from 'react-bootstrap'
import axios from 'axios'
import AuthContext from '../context/AuthContext';
import { BsFillCloudArrowDownFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import DeleteCandidateModal from '../components/Modals/DeleteCandidateModal';
import PaginationNav from '../components/PaginationNav';
import { BsCaretDown , BsFilter , BsSearch, BsFillEyeFill} from "react-icons/bs";

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
  // console.log('authTokens',authTokens)
  const getCandidateList = async () => {
    setLoadingData(true)
    let auth = { headers: { Authorization: `Bearer ${authTokens.access}` } };
    try{
      const responce = await axios.get(`http://127.0.0.1:8000/candidate/list/`,
      auth
      );
      setCandidateList(responce.data);
      // console.log('getCandidateList', responce.data)
      setLoadingData(false)
      setresetLoading(false)
      
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
    //  console.log('forceDownload',responce)
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

  // state of Pagination Table
    const [ currentPage , setCurrentPage ] = useState(1)
    const [ recordsPerPage, setRecordsPerPage ] = useState(5)
    const indexOfLastRow = currentPage * recordsPerPage; 
    const indexOfFirstRow = indexOfLastRow - recordsPerPage; // first index in each page 
    const recordsCandidate = candidateList.slice(indexOfFirstRow, indexOfLastRow);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    // state of Search Table
    const [resetLoading, setresetLoading] = useState(false);
    const [value,setValue] =useState('')

    const handleSearch = (e) => {
      e.preventDefault();
      if(value){
        const filterdData = (candidateList.filter((candid) => {
          return((candid.full_name && candid.full_name.toLowerCase().includes(value.toLowerCase()))
          || (candid.years_of_experience && candid.years_of_experience == value)
          || (candid.department && candid.department.toLowerCase().includes(value.toLowerCase()))
          )
        }))
        .slice(indexOfFirstRow, indexOfLastRow)
        setCandidateList(filterdData)
      }
    }
    const handleReset = () => {
      setresetLoading(true)
      getCandidateList()
      setValue('')
    }


  return (
    <div className='candidate-container'>
      <div className='Can-header'>
          <div className='Can-text'>Candidate Table</div>
          <div className='Can-underline'></div>
      </div>



      <div className='table-container'>
      {loadingData && <div className='spinner-div'><Spinner animation='border' style={{color:'#ffb609'}} /></div>}
      {!loadingData && <>

      <div className='table-functions'>

          <Form 
            onSubmit={handleSearch}
            >
              <Form.Label className='table-label'>Search (Name, Department, Experience Years)</Form.Label>
            <div style={{display:'flex', alignItems:'center'}}>
            <Form.Group controlId="value" className='mb-3' style={{width:'100px'}}>
              <Form.Control type="text" 
              placeholder='Search'
              value={value}
              onChange={(e) => setValue(e.target.value)}/>
            </Form.Group>
            <Button title='search' size='sm' type='submit' variant="light" className='searchButton'><BsSearch /></Button>
            <Button title='reset' size='sm' onClick={handleReset} className='resetButton' variant="light">{resetLoading ?  <Spinner animation='border' size='sm'/>:<BsFilter />}</Button>
            </div>
          </Form>

          <div>
              <Form.Label className='table-label'>No.Candidate / page <BsCaretDown /> </Form.Label>
              <Form.Select
                as="select"
                value={recordsPerPage} 
                onChange={(e)=> setRecordsPerPage(e.target.value)}
              >
                    <option value={3} id="options">{3}</option>
                    <option value={5} id="options">{5}</option>
                    <option value={10} id="options">{10}</option>
                    <option value={15} id="options">{15}</option>
                    <option value={20} id="options">{20}</option>
              </Form.Select>
              </div>
      </div>

      <Table hover className='table-container'>
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
            recordsCandidate.map((candidate, indx)=> (
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

      </Table>
      {/* Pagination Nav */}
      <div style={{display:'flex', justifyContent:'flex-end'}}>
      <PaginationNav
      recordsPerPage = {recordsPerPage}
      totalRows = {candidateList.length} 
      currentPage={currentPage}
      paginate= {paginate} />
      </div>
      </>}
      </div>

    </div>
  )
}

export default Candidates