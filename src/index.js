import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function Copyright() {
  const footerstyle = {
    // width: '100%',
    // textAlign: 'center',
    // backgroundColor: '#bf4080',
    // color: 'white',
    // marginBottom: '0px',
    // bottom: '0px',
    // position: 'relative'
    position:'absolute',
        width:'100%',
        height:'auto',   /* Height of the footer */
        textAlign:'center',
        backgroundColor: '#bf4080',
        padding: '20px',
        marginBottom: '0px'
}
  return (
      <h5 style={footerstyle}>{'Copyright © Technocomplnc. All Rights Reserver'}</h5>
  );
  }

function Header() {
  const footerstyle = {
    margin: '0px',
    width: '100%',
    backgroundColor: '#bf4080',
    textAlign: 'center',
    padding: '20px',
    display: 'block',
    color: 'white'
    
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
    <br/><br/><br/><br/><br/><br/><br/><br/>
    <Copyright />
  </ThemeProvider>,
  document.querySelector('#root'),
);
