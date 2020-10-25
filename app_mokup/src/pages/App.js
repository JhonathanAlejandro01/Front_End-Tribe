import React from 'react';
import './assets/css/App.css';

// import components
import Header from '../components/Header'
import Container from '../components/Container'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <hr></hr>
      </header>
      <div class="container-fluid">
        <div class="row d-flex justify-content-center">
          <div class="col-5 border">
            <Container />
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;
