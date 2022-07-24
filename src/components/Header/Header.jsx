import React from 'react'
import './header.css'
function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <div className="d-flex justify-content-between align-items-center" style={{width:"100%"}}>
          <a className='navbar-brand' href='/'><h4>BAPPY</h4></a>
            <div>ProjectMgmt</div>
          </div>
      </div>
    </nav>
  )
}

export default Header