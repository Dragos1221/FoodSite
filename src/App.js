import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import RecipesByNutrients from './pages/RecipesByNutrients'

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" component={RecipesByNutrients}/>
        </Switch>
    </Router>
  );
}

export default App;
