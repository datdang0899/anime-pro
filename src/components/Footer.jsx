import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="footer">
      <Link href="/">
        <a>Anime-Pro</a>
      </Link>
      <div className="list-social">
        <Link href="https://www.facebook.com/">
          <a className="fa fa-facebook" aria-hidden="true"></a>
        </Link>

        <Link href="https://twitter.com/?lang=vi">
          <a className="fa fa-twitter" aria-hidden="true"></a>
        </Link>

        <Link href="https://www.skype.com/en/">
          <a className="fa fa-skype" aria-hidden="true"></a>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
