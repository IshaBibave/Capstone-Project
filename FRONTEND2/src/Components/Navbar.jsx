import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { data } from "../restApi.json";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [isLogInVisible, setLogInVisible] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSignUp = async (data) => {
    try {
      const response = await fetch("https://capstone-project-backend2.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // if (response.ok) {
      //   console.log('User registered successfully');
      //   setSignUpVisible(false);
      // } else {
      //   console.error('Error registering user');
      // }
      const res = await response.json();
      if (res?.success) {
        setSignUpVisible(false);
        setLogInVisible(true);
        localStorage.setItem("user_token", res?.token);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogIn = async (data) => {
    try {
      const response = await fetch("https://capstone-project-backend2.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res?.success) {
        setLogInVisible(false);
        setUserName(res?.username);
        localStorage.setItem("user_token", res?.token);
        localStorage.setItem('user_name', res?.username)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('user_token')) {
      setUserName(localStorage.getItem('user_name'))
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('user_token')
    setUserName('')
  }
  return (
    <nav>
      <div className="logo">NOURISH</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="link">
          {data[0].navbarLinks.map((element) => {
            return (
              <Link
                to={element.link}
                key={element.id}
                spy={true}
                smooth={true}
                duration={500}
              >
                {element.title}
              </Link>
            );
          })}
        </div>
        {isSignUpVisible && (
          <SignUp
            onClose={() => setSignUpVisible(false)}
            onSignUp={handleSignUp}
          />
        )}
        {isLogInVisible && (
          <LogIn onClose={() => setLogInVisible(false)} onLogIn={handleLogIn} />
        )}
        {userName ? (
          <div className="userDetails">
          <div>Hello {userName}</div>
          <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="buttons">
            <button onClick={() => setSignUpVisible(true)}>Sign Up</button>
            <button onClick={() => setLogInVisible(true)}>Log In</button>
          </div>
        )}
        <button className="menuBtn">OUR MENU</button>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
