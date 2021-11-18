import React from "react";
import './styles.css';

function Item({store, item}){
  return (
    <div className='Item' onClick={() => store.selectItem(item.code)}>
      <div className='Item__number'>{item.code}</div>
      <div className='Item__title'>{item.title}</div>
      <div className='Item__actions'>
        <button onClick={() => store.deleteItem(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default Item;