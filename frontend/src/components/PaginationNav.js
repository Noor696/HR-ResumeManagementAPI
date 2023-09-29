import React from 'react'
import './PaginationNav.css'

function PaginationNav(props) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalRows / props.recordsPerPage); i++) {
        pageNumbers.push(i);
      }

  return (
    <nav>
      <ul className="pagination" style={{ marginTop: "1rem" }}>
          <li key='a' className='page-item'>
            <a href='#' className='page-link' onClick={()=> props.currentPage!= 1 ? props.paginate(props.currentPage-1) : props.paginate(props.currentPage)} id="previous" >Prev</a>
          </li>
        {pageNumbers.map(number => (
            
          <li key={number} className={`page-item ${props.currentPage === number ? "activePage" : ""}`}>
            <a onClick={() => props.paginate(number)} href='#' className='page-link' id="pageN">
              {number}
            </a>
          </li>
          
        ))}
        <li key='b' className='page-item'>
            <a href='#' className='page-link' onClick={()=> props.currentPage!= pageNumbers.length ? props.paginate(props.currentPage+1) : props.paginate(props.currentPage)} id="next">Next</a>
          </li>
      </ul>
    </nav>
  )
}

export default PaginationNav