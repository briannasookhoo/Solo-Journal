import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // route diff urls to diff react components easier
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

// import components 
import Navbar from "./components/navbar.component.js";
import EntriesList from "./components/entries-list.component";
import EditEntry from "./components/edit-entry.component";
import CreateEntry from "./components/create-entry.component";
import HappyList from "./components/happy-list.component";

// router maps specific url paths to specific components that will load on the page
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={EntriesList} />
        <Route path="/edit/:id" component={EditEntry} />
        <Route path="/happy" component={HappyList} />
        <Route path="/create" component={CreateEntry} />
      </div>
    </Router>
  );
}

export default App;

// There is a <Route> element for each route of the application. 
// The path attribute sets the url path. 
// The component is the code that will be loaded when a user goes to that path.