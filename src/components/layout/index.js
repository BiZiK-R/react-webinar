import React from "react";
import cn from 'classnames';
import './styles.css';

function Layout({head, content, theme, children}){
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