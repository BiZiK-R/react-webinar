import React from "react";
import cn from 'classnames';
import './styles.css';

<<<<<<< HEAD
function Layout({head, content, theme, children}){
=======
function Layout({head, content, children}){
>>>>>>> lecture-3
  return (
    <div className={cn('Layout', theme ? `Layout_${theme}` : '')}>
      <header className='Layout__head'>
        {head}
      </header>
      <div className='Layout__center'>
        {content || children}
      </div>
    </div>
  )
}

export default React.memo(Layout);