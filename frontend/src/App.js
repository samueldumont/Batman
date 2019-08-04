import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateSighting from './pages/sightings/create'
import ViewSighting from './pages/sightings/view'
import MapSightings from './pages/sightings/map'

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/sightings/create/">create sighting</Link>
            </li>
            <li>
              <Link to="/sightings/view/">view sighting</Link>
            </li>
            <li>
              <Link to="/sightings/map/">view sightings map</Link>
            </li>
          </ul>
        </nav>


        <Route path="/sightings/create/" component={CreateSighting} />
        <Route path="/sightings/view/" component={ViewSighting} />
        <Route path="/sightings/map/" component={MapSightings} />
      </div>
    </Router>
  );
}

export default AppRouter;
