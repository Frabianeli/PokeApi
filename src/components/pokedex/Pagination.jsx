import React, { useRef } from 'react'

const Pagination = ({ arrayPages, currentBlock, currentPage, setCurrentPage, quantityPages }) => {

  const listNumber = useRef()

  const prevPage = () => {
    if (currentPage - 1 === 0) {
      setCurrentPage(quantityPages)
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage + 1 > quantityPages) {
      setCurrentPage(1)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  const nextBlock = () => {
    if ((currentBlock * 5) + 1 > quantityPages) {
      setCurrentPage(1)
    } else if (currentBlock === 1) {
      setCurrentPage(6 * currentBlock)
    } else {
      setCurrentPage(5 * currentBlock + 1)
    }
  }

  const preventBlock = () => {
    if (currentBlock === 1) {
      setCurrentPage(quantityPages)
    } else if (currentBlock === 2) {
      setCurrentPage(5)
    } else {
      setCurrentPage(5 * (currentBlock - 1))
    }

  }

  const changePageTo = n => setCurrentPage(n)

  return (
    <div className='pagination-container'>
      <div onClick={prevPage} className='pagination-prev-next'>
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div onClick={preventBlock} className='ellipsis'>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
      <ul ref={listNumber} className='pagination-number-container'>
        {
          arrayPages?.map(num => (
            <li
              onClick={() => changePageTo(num)}
              key={num}
              className={currentPage === num ? `page-number page-active` : `page-number`}
            >{num}</li>
          ))
        }
      </ul>
      <div onClick={nextBlock} className='ellipsis'>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
      <div onClick={nextPage} className='pagination-prev-next'>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  )
}

export default Pagination