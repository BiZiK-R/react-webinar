import React from "react";
import cn from 'classnames';
import './styles.css';

function Layout({head, content, theme, children}){
  return (
    <div className={cn('Layout', theme ? `Layout_${theme}` : '')}>
      <div className='Layout__head'>
        {head}
      </div>
      <div className='Layout__center'>
        {content || children}
      </div>
    </div>
  )
}

export default React.memo(Layout);