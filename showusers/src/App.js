import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
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
import TODOForm from './components/TODOForm'

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
      'token': '',

    }
  }

  load_data() {
    const headers = this.get_headers()
    console.log(headers, "Load_data")
    axios.get(get_url('users/'), { headers })
      .then(response => {
        this.setState({ users: response.data })
      }).catch(error => console.log(error))

    axios.get(get_url('projects/'), { headers })
      .then(response => {
        this.setState({ projects: response.data.results })
      }).catch(error => console.log(error))

    axios.get(get_url('todo/'), { headers })
      .then(response => {
        this.setState({ todos: response.data.results })
      }).catch(error => console.log(error))
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    console.log({ 'username': username, 'password': password })
    axios.post('http://127.0.0.1:8000/api-token-auth/', { 'username': username, 'password': password })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => console.log('Неверный логин или пароль.'))
  }


  is_auth() {
    return !!this.state.token
  }

  get_headers() {
    let headers = {
      'Content-Type': 'applications/json'
    }
    if (this.is_auth()) {
      headers['Authorization'] = `Token ${this.state.token}`

    }
    return headers
  }

  logout() {
    this.set_token('')

  }


  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers: headers })
      .then(response => {
        this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }


  createTODO(text_to_do, create_or_update, project_name, user) {
    console.log('Нажали кнопку запуска')
    const headers = this.get_headers()
    const data = { text_to_do: text_to_do, create_or_update: create_or_update, project_name: project_name, user: user }
    console.log(data)
    console.log(headers)
    axios.post(`http://127.0.0.1:8000/api/todo/`, data, { headers: headers })
      .then(response => {
        let new_todo = response.data
        console.log(response.data, 'полученные данные')
        const user = this.state.todos.users.filter((item) => item.id === new_todo.user)[0]
        const project_name = this.state.todos.project_name.filter((item) => item.id === new_todo.project_name)[0]
        new_todo.user = user
        this.setState({ todos: [...this.state.todos, new_todo] })
      }).catch(error => console.log(error))
  }

  deleteTODO(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers: headers })
      .then(response => {
        this.setState({ todos: this.state.todos.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }


  get_token_from_cookies() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }


  componentDidMount() {
    this.get_token_from_cookies()
    console.log(this.state, 'did mount')
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <img src={logo} className='App-logo' />
            {<Navbar /* navbarItems={this.state.navbarItems} */ />}
            <ul>
              <li>
                {this.is_auth() ? <button className='btn btn-primary' onClick={() => this.logout()}>Logout</button> :
                  <Link to='/login'>Login</Link>
                }
              </li>
            </ul>
          </header>
          <div>
            <Routes>
              <Route path='/' element={<UserList users={this.state.users} />} />
              <Route path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
              <Route path='/todo' element={<TODOList items={this.state.todos} deleteTODO={(id) => this.deleteTODO(id)} />} />
              <Route path='/TODO/create' element={<TODOForm projects={this.state.projects} user={this.state.users} createTODO={(text_to_do, create_or_update, project_name, user) => this.createTODO(text_to_do, create_or_update, project_name, user)} />} />
              <Route path='/project/:id' element={<ProjectDetalization getProject={(id) => this.getProject(id)} project={this.state.project} />} />
              <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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
