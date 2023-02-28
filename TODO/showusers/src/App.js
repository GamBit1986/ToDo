import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import axios from 'axios';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import Navbar from './components/Menu.js';

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      /* navbarItems: [
        {name: 'Users', href: '/'},
        {name: 'Projects', href: '/projects'},
        {name: 'TODO', href: '/todo1'},        
      ], */
      users: [] 
    }
  }
  
  componentDidMount() {
    axios.get(get_url('users/'))
      .then(response => {        
          this.setState({users: response.data})
      }).catch(error => console.log(error))
    }
  render () {
    return (
      <div>
          <header>         
            <img src={logo} className='App-logo' />
              {<Navbar /* navbarItems={this.state.navbarItems} *//>}       
          </header>
        <div>
          <UserList users={this.state.users} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
    }
  }
  

export default App;
