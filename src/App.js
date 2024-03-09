import { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import RunTracker from './components/runTracker/RunTracker';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        joined: '',
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
    });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3003/validate', {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.id) { // Assuming the data includes user id when token is valid
          this.loadUser(data); // You would also modify loadUser as necessary to fit this data structure
          this.onRouteChange('home');
        }
      })
      .catch(err => {
        console.error('Session validation error:', err);
      });
    }
  }
  


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <h1>Run Tracker</h1>
            <RunTracker userId={this.state.user.id} />
          </div>
        ) : route === 'signin' ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
