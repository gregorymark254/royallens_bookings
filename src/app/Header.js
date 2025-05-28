import { FaFacebookF, FaTwitter, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

export default function Page() {
    return (
        <div className="p-2">
            <div className="container flex items-center justify-end space-x-3">
                <h3><a href="https://www.linkedin.com/company/roadrims-logistics/"><FaLinkedin/></a></h3>
                <h3><a href="https://www.facebook.com/profile.php?id=61557118238497&mibextid=ZbWKwL"><FaFacebookF/></a></h3>
                <h3><a href="https://x.com/roadrimz"><FaTwitter/></a></h3>
                <h3><a href="https://www.instagram.com/roadrims_?igsh=cXhqaHB0a3F0d3hh"><FaInstagramSquare/></a></h3>
            </div>
        </div>
    );
}