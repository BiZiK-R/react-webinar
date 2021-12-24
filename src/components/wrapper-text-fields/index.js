import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';

function WrapperTextFields(props){

  // CSS классы по БЭМ
  const className = cn('WrapperTextFields');

  return (
    <div className={className()}>
      <div className={className('Description')}>{props.description}</div>
      {props.children}
      <div className={className('Error')}>
        {props.error}
      </div>
    </div>
  )
}

WrapperTextFields.propTypes = {
  description: propTypes.string,
  error: propTypes.string,
}

WrapperTextFields.defaultProps = {
  description: '',
  error: '',
}

export default React.memo(WrapperTextFields);
