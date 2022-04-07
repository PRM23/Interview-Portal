import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Test from "./components/Test";
import Finish from "./components/Finish";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    // <Home/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/test/:_id/:_id1" element={<Test />} />
        <Route path="/finish/:_id/:question_length" element={<Finish />} />
      </Routes>
    </Router>
  );
}

export default App;
