import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progressNum, setProgressNum] = useState(0)
  const setProgress = (progress) => {
    setProgressNum(progress)
  }
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={4}
          color='#f11946'
          progress={progressNum}
        />
        <Routes>
          <Route exact path='/business' element={<News setProgress={setProgress} key={'business'} apikey={apikey} pageSize={5} country={'in'} category={'business'} />} />
          <Route exact path='/' element={<News setProgress={setProgress} key={'general'} pageSize={5} apikey={apikey} country={'in'} category={'general'} />} />
          <Route exact path='/science' element={<News setProgress={setProgress} key={'science'} pageSize={5} apikey={apikey} country={'in'} category={'science'} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;