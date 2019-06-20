import React from "react";
import { Link } from "react-router-dom";

import Clock from "react-live-clock";

import { Icon } from "@iconify/react";
import fullscreenOutline from "@iconify/react/ant-design/fullscreen-outline";
import fullscreenExitOutline from "@iconify/react/ant-design/fullscreen-exit-outline";

class Header extends React.Component {
  toggleFullScreen() {
    if (!document.documentElement.requestFullscreen()) {
      document.documentElement.requestFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  }

  render() {
    return (
      <div className="container-fluid py-3 bg-white align-middle" id="navbar">
        <div className="row">
          <div className="col-2 pt-4 text-secondary rounded clock">
            <div className="border clock-content">
              <Clock
                format={"HH:mm:ss"}
                ticking={true}
                timezone={"Australia/Brisbane"}
              />
            </div>
          </div>
          <div className="col-8">
            <Link to={"/"} className="nav-link">
              <img
                alt="STG Logo"
                src="./img/logo-stg.png"
                className="stgLogo"
              />
            </Link>
          </div>
          <div className="col-2 text-right zoomIco">
            <Icon
              icon={fullscreenOutline}
              className="text-secondary"
              onClick={this.toggleFullScreen}
            />
            <Icon
              icon={fullscreenExitOutline}
              className="text-secondary d-none"
              onClick={this.toggleFullScreen}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
