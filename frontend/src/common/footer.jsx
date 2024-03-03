
const Footer = ()=>{
    return(
        <div className="container-fluid">
            <footer className="row p-3 bg-dark text-center text-warning">
                <div className="col-lg-3 mt-3">
                    <h5>Get to Know Us</h5>
                    <ul className="footer-points text-start ms-5">
                        <li>About Us</li>
                        <li>Careers</li>
                    </ul>
                </div>

                <div className="col-lg-3 mt-3">
                    <h5>Connect with Us</h5>
                    <ul className="footer-points text-start ms-5">
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                    </ul>
                </div>
                <div className="col-lg-3 mt-3">
                    <h5>Make Money with Us</h5>
                    <ul className="footer-points text-start ms-4">
                        <li>Sell on PenStore</li>
                        <li>Become an Affiliate</li>
                        <li>Advertise Your Products</li>
                        <li>Build Your Brand</li>
                        <li>Refer and Earn</li>
                    </ul>
                </div>
                <div className="col-lg-3 mt-3">
                    <h5>Let Us Help You</h5>
                    <ul className="footer-points text-start ms-5">
                        <li>Your Account</li>
                        <li>Return Center</li>
                        <li>Help & Support</li>
                        <li>Download Our App</li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer;