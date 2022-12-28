import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import {FaTimes} from "react-icons/fa";
import Logo from "./Logo";
import {useDispatch, useSelector} from "react-redux";
import NavLinks from "./NavLinks";
import {toggleSidebar} from "../features/sidebar/sidebarSlice";
const SmallSidebar = () => {
  const dispatch = useDispatch();
  const {isSidebarOpen} = useSelector((store) => store.sidebar);
  const toggle = () => dispatch(toggleSidebar());
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
