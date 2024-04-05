import React from "react";

const Navbar = () => {
  const dataFromSession = sessionStorage.getItem('Name');
  const userId = sessionStorage.getItem('UserId');
  const isLoggedIn = dataFromSession ? true : false;
  const isAdmin = dataFromSession && dataFromSession.toUpperCase() == 'ADMIN ADMIN' ? true : false;
  const handleClick =  () => {
    sessionStorage.clear();
    window.location.reload();
  };
  const content = isLoggedIn ? <li>
                  <a href="" onClick={handleClick}>LOGOUT</a>
                  </li> : <li>
                  <a href="/login">LOGIN/SIGNUP</a>
                  </li> ;

  return (
    <nav>
      <ul>
        <li>
             {/* <a href={`/user-details/${userId}`}>{dataFromSession ? dataFromSession.toUpperCase() : ''}</a> */}
             <a href={`/user-details`}>{dataFromSession ? dataFromSession.toUpperCase() : ''}</a>
        </li>
        <li>
          <a href="/home">HOME</a>
        </li>
        { isAdmin ? (
          <li>
          <a href="/admin">ADMIN</a>
          </li>
        ): ''}
        { content }
        <li>
          <a href="/products">PRODUCTS</a>
        </li>
        <li>
          <a href="/cart">CART</a>
        </li>
      </ul>
    </nav>
    
  );
};

const Page = () => {
  return (
    <header>
      <div id="head-section">
      <img src="./images/logo.png" href="/" alt="header-logo-image" width="10%" />
            <Navbar />
        </div>
    </header>
  );
};

export default Page;
