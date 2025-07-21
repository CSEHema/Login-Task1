import React from "react";
import image from '../static/images/download (1).jpeg'

function Dashboard() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark text-white ">
        <div className="container-fluid">
          <h1 className="navbar-brand text-white">WELCOME</h1>
        </div>
      </nav>
      <div
  className="d-flex justify-content-center align-items-center vh-100 bg-light"
  style={{
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="card p-4 w-100" style={{ maxWidth: '400px' }}>
    <h5 className="text-center mb-3">Login</h5>
    <p className="text-center">Welcome to the app!</p>
  </div>
  </div>
  </div>
  );
}

export default Dashboard;
