import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Cookies from "universal-cookie";


import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import ProjectDetalization from './components/ProjectDetail';
import TODOList from './components/Todo.js';
import axios from 'axios';
import Footer from './components/Footer.js';
import Navbar from './components/Menu.js';
import NotFound404 from './components/NotFound404.js'
import LoginForm from './components/Auth';

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {      
      'users': [],
      'projects': [],
      'project': {},      
      'todos': [],
      'token':'',
    
    }
  }

  load_data(){
    const headers = this.get_headers()
    axios.get(get_url('users/'), {headers})
      .then(response => {        
          this.setState({users: response.data})
      }).catch(error => console.log(error))

    axios.get(get_url('projects/'), {headers})
      .then(response => {        
          this.setState({projects: response.data.results})
      }).catch(error => console.log(error))

    axios.get(get_url('todo/'), {headers})
      .then(response => {                 
          this.setState({todos: response.data.results})
      }).catch(error => console.log(error))
  }

  set_token(token){
    const cookies = new Cookies()    
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password){
    console.log({'username':username, 'password':password})
    axios.post('http://127.0.0.1:8000/api-token-auth/',{'username':username, 'password':password})
      .then(response => {        
          this.set_token(response.data['token'])
      }).catch(error => console.log(error))
  }

  is_auth(){
    return !!this.state.token
  }

  get_headers(){
    let headers = {
      'Content-Type': 'applications/json'
    }
    if(this.is_auth()){
      headers['Authorization'] = `Token ${this.state.token}`
    }
    return headers
  }

  logout(){
    this.set_token('')

  }

  get_token_from_cookies(){
    const cookies = new Cookies()
    const token = cookies.get('token')    
    this.setState({'token': token}, ()=>this.load_data())
  }
  
  componentDidMount() {
        this.get_token_from_cookies()
    }
  render () {
    return (
      <BrowserRouter>
      <div>        
          <header>         
            <img src={logo} className='App-logo' />
              {<Navbar /* navbarItems={this.state.navbarItems} *//>}
              <ul>
                <li>
                  {this.is_auth()? <button onClick={()=> this.logout()}>Logout</button>:
                    <Link to='/login'>Login</Link>
                  }
              </li>
              </ul>
          </header>
        <div>
          <Routes>
            <Route path='/' element={<UserList users={this.state.users} />}/>           
            <Route path='/projects' element={<ProjectList projects={this.state.projects} />}/>
            <Route path='/todo' element={<TODOList items={this.state.todos} />}/>
            <Route path='/project/:id' element={<ProjectDetalization getProject={(id) => this.getProject(id)}
                                                                     item={this.state.project} />}/>

            <Route path='/login' element={<LoginForm get_token={(username, password)=> this.get_token(username, password)} />} />
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
