import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function Copyright() {
  const footerstyle = {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    backgroundColor: '#e6ffe6',
    padding: '20px'
}
  return (
      <h5 style={footerstyle}>{'Copyright © Technocomplnc. All Rights Reserver'}</h5>
  );
  }

function Header() {
  const footerstyle = {
    margin: '0px',
    width: '100%',
    backgroundColor: '#e6ffe6',
    padding: '15px',
    display: 'block'
} 
return (
  <h2 style={footerstyle}>{'TechnoComp'}</h2>
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
