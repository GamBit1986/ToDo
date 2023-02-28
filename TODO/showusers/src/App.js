import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';


import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import ProjectDetalization from './components/ProjectDetail';
import TODOList from './components/Todo.js';
import axios from 'axios';
import Footer from './components/Footer.js';
import Navbar from './components/Menu.js';
import NotFound404 from './components/NotFound404.js'

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {      
      users: [],
      projects: [],
      project: {},      
      todos: [],
      /* todo: [], */
    }
  }
  
  componentDidMount() {
    axios.get(get_url('users/'))
      .then(response => {        
          this.setState({users: response.data})
      }).catch(error => console.log(error))

    axios.get(get_url('projects/'))
      .then(response => {        
          this.setState({projects: response.data.results})
      }).catch(error => console.log(error))

    axios.get(get_url('todo/'))
      .then(response => {                 
          this.setState({todos: response.data.results})
      }).catch(error => console.log(error))
    }
  render () {
    return (
      <BrowserRouter>
      <div>        
          <header>         
            <img src={logo} className='App-logo' />
              {<Navbar /* navbarItems={this.state.navbarItems} *//>}       
          </header>
        <div>
          <Routes>
            <Route path='/' element={<UserList users={this.state.users} />}/>           
            <Route path='/projects' element={<ProjectList projects={this.state.projects} />}/>
            <Route path='/todo' element={<TODOList items={this.state.todos} />}/>
            <Route path='/project/:id' element={<ProjectDetalization getProject={(id) => this.getProject(id)}
                                                                     item={this.state.project} />}/>
            <Route path='*' element={<NotFound404 />} />
            
          </Routes>
        </div>
          <div>
            <Footer />
          </div>
        </div>
        </BrowserRouter>
    )
    }
  }
  

export default App;
