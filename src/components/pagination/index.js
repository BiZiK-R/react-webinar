import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function Pagination({numberOfPages, selectPage, onSelect}) {

  const listPages = [];

  for (let i = 0; i < numberOfPages; i++) {
    listPages.push(
      <li onClick={(e) => onSelect(e)} value={i} className={`Pagination__item ${selectPage === i ? 'Pagination__item_select' : ''}`} key={i}>
        {i+1}
      </li>
    )
  }

  return(
    <ul className="Pagination">
      {listPages}
    </ul>
  )
}

Pagination.propTypes = {
  numberOfPages: propTypes.number.isRequired,
  selectPage: propTypes.number.isRequired,
}

export default Pagination
