import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>© {currentYear} EasyNote App. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;