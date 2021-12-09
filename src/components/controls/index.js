<<<<<<< HEAD
import React from "react";
import propTypes from 'prop-types';
import './styles.css';

function Controls({onCreate}){
  return <div className='Controls'>
    <button onClick={onCreate}> Добавить</button>
  </div>
}

Controls.propTypes = {
  onCreate: propTypes.func.isRequired
}

Controls.defaultProps = {
  onCreate: () => {}
}

=======
import React from "react";
import propTypes from 'prop-types';
import './styles.css';

function Controls({onCreate}){
  return <div className='Controls'>
    <button onClick={onCreate}> Добавить</button>
  </div>
}

Controls.propTypes = {
  onCreate: propTypes.func.isRequired
}

Controls.defaultProps = {
  onCreate: () => {}
}

>>>>>>> lecture-3
export default React.memo(Controls);