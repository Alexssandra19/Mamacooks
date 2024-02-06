import React from "react";

const Navbar = () => {
  return (
    
    <nav>
      <ul>
        <li>
          <a href="/registration">REGISTER</a>
        </li>
        <li>
          <a href="/login">LOGIN</a>
        </li>
        <li>
          <a href="/checkout">CHECKOUT</a>
        </li>
      </ul>
    </nav>
    
  );
};

const Page = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Page;
