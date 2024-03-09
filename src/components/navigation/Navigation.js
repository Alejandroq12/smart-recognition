const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#282c34',
          padding: '10px',
        }}
      >
        <p
          onClick={() => onRouteChange('signout')}
          className="f3 link dim white pa3 pointer"
          style={{
            marginRight: '20px',
            cursor: 'pointer',
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.color = 'skyblue')}
          onMouseOut={(e) => (e.target.style.color = 'white')}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#282c34',
          padding: '10px',
        }}
      >
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim white pa3 pointer"
          style={{
            marginRight: '20px',
            cursor: 'pointer',
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.color = 'skyblue')}
          onMouseOut={(e) => (e.target.style.color = 'white')}
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim white pa3 pointer"
          style={{
            marginRight: '20px',
            cursor: 'pointer',
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.color = 'skyblue')}
          onMouseOut={(e) => (e.target.style.color = 'white')}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
