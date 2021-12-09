import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <Router>
      <Main/>
      {select.name === 'basket' && <Basket/>}
    </Router>
  );
}

export default React.memo(App);
