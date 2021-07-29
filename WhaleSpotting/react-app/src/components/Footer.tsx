import "../styles/Footer.scss";
import React from "react";

export function Footer(): JSX.Element {
    return (
        <div className="footer" data-testid="footer">
            <div className="footer-logo-container">
                <a className="link whale-link" href="https://whalemuseum.org/">
                    <img
                        className="logo"
                        data-testid="whale-museum-logo"
                        src="https://cdn.shopify.com/s/files/1/0249/1083/t/3/assets/wm-logo-sm.png"
                        alt="The Whale Museum logo" />
                </a>
                <a className="link" href="https://www.techswitch.co.uk/">Made By:
                    <img
                        className="logo techswitch-logo"
                        data-testid="techswitch-logo"
                        src="https://www.techswitch.co.uk/images/logo.svg"
                        alt="TechSwitch logo" />
                </a>
            </div>
        </div>
    );
}
