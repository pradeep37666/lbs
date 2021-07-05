import './App.css';
import Home from "./pages/home/home.js";
import ItemPage from "./pages/item/item.js";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/item/:itemId" component={ItemPage}/>
    </Router>
  );
}

export default App;
