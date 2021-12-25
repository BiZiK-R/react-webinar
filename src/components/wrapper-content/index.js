import React from 'react';
import './styles.css';

function WrapperContent(props) {
  return (
    <div className='Wrapper'>
      {props.children}
    </div>
  )
}


export default React.memo(WrapperContent);
