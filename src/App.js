import './App.css';
import Login from "./view/Login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Admin from './view/Admin';
import { FilesByProgramme } from "./view/FilesByProgramme";
import Home from './view/Home';
import Materia from './view/Materia';



function App() {
    return (
        <Router>
            
            <Switch>
                <Route exact path="/">
                    <div className="App">
                        <header className="App-header">
                            <Login/>
                        </header>
                    </div>
                </Route>
                <Route path="/Admin">
                    <Admin/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/pdfview">
                    <FilesByProgramme/>
                </Route>
                <Route exact path="/materias/:idMateria" component = {Materia}/>
                                    
                
            </Switch>
        </Router>
    );
}

export default App;
