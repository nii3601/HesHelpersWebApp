import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home.js';
import Assigned from "./Pages/Assigned.js";

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route index element={<Home />}/>
      <Route path="/Assigned" element={<Assigned />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
