import { BrowserRouter } from "react-router-dom";

import PaymentGetwayApp from "./PaymentGetwayApp";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PaymentGetwayApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
