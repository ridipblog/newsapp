import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={4}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/business' element={<News setProgress={this.setProgress} key={'business'} apikey={this.apikey} pageSize={5} country={'in'} category={'business'} />} />
            <Route exact path='/' element={<News setProgress={this.setProgress} key={'general'} pageSize={5} apikey={this.apikey} country={'in'} category={'general'} />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} key={'science'} pageSize={5} apikey={this.apikey} country={'in'} category={'science'} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
