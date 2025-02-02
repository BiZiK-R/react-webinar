import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';

function Select(props){

  // CSS классы по БЭМ
  const className = cn('Select');

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value, e.target.name);
  }, [props.onChange])

  const onBlur = useCallback((e) => {
    props.onBlur(e);
  }, [props.onChange])

  return (
    <select name={props.name} className={className()} onChange={onSelect} onBlur={onBlur} value={props.value}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  name: propTypes.string,
}

Select.defaultProps = {
  onChange: () => {
  },
  onBlur: () => {},
}

export default React.memo(Select);
