import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';
import throttle from "lodash.throttle";

function Input(props) {

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(throttle((value, name) => props.onChange(value, name), 1000), [props.onChange]);

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    change(event.target.value);
    changeThrottle(event.target.value, event.target.name);
  }, [change, changeThrottle]);

  // Обновление стейта, если передан новый value
  useEffect(() => {
    change(props.value);
  }, [props.value]);

  // CSS классы по БЭМ
  const className = cn('Input');

  return (
    <input
      className={className({theme: props.theme})}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
      name={props.name}
    />
  )
}

Input.propTypes = {
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]),
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: ''
}

export default React.memo(Input);
