import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function Copyright() {
  const footerstyle = {
    position: 'relative',
    display: 'flex',
    justifyItems: 'bottom',
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: '#4527a0',
    color: 'white',
    padding: '10px',
    textAlign: 'center'
}
  return (
      <h5 style={footerstyle}>{'Copyright © Techno-Comp,Inc. All Rights Reserver'}</h5>
  );
  }

function Header() {
  const footerstyle = {
    margin: '0px',
    width: '100%',
    backgroundColor: '#5e35b1',
    textAlign: 'center',
    padding: '20px',
    display: 'block',
    color: 'white'
    
} 
return (
  <h2 style={footerstyle}>{'TECHNO-COMP'}</h2>
);
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Header/>
    <App />
    <Copyright />
  </ThemeProvider>,
  document.querySelector('#root'),
);
