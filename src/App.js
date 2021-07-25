import React from 'react'
import Table from './TableComponents/Table'
import Header from './Header'
import Sidebar from './Sidebar'
import './App.css'

function App() {
    return (
    <div className="App">
      <Header />
      <Sidebar />
      <Table />
    </div>
  );
}

export default App;
