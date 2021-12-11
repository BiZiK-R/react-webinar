import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import CardProduct from './card-product';

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <Router>
      {select.name === 'basket' && <Basket/>}
      <Routes>
        <Route path="/" exact element={<Main/>}/>
        <Route path="/:idProduct" element={<CardProduct/>}/>
      </Routes>
    </Router>
  );
}

export default React.memo(App);
