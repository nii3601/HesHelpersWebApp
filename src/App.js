import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home.js';
import Assigned from "./Pages/Assigned.js";
import Parse from "parse";

function App() {

  const PARSE_APPLICATION_ID = 'v840lhtRewsAyjbP5uC8DUgZ7lT1x5dwXdtbTJQs';
  const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
  const PARSE_JAVASCRIPT_KEY = 'EYqt2howFhV54srI8GPkv7tMZ1Mj5GEch0WnVhFY';
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;
  
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
