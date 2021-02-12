import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import EditPage from './pages/EditPage';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar/>
          <Route path='/' component={HomePage} exact/>
          <Route path='/edit/:id' component={EditPage}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
