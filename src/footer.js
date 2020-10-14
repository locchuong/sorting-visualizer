import React from "react";
import github from './media/github.png';
import handshake from './media/handshake.png';

function Footer() {
  return (
    <div className="footer">
      <h2> Contact me @ </h2> 
      <a id="githublogo" href="https://github.com/locchuong"><img src={github} alt="github" width="38"></img></a>
      <a id="handshakelogo" href="https://ucsd.joinhandshake.com/users/11404176"><img src={handshake} alt="handshake" width="38"></img></a>
    </div>
  );
}

export default Footer;