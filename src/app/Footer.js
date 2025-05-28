import { MdLocationOn,MdPhoneIphone,MdEmail } from "react-icons/md";
import { FaFacebookF,FaInstagramSquare,FaTwitter,FaYoutube } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

export default function Page() {
    return (
      <div className="bg-[#111428] text-white">
        <div className="container mx-auto p-4 w-full lg:w-2/3">
          <div className="flex flex-wrap items-center justify-between p-4">
            <div>
              <span>&copy; 2025 - All Rights Reserved - Royal Lens.</span>
            </div>
            <div>
              <span>Terms & Condition | Privacy Policy.</span>
            </div>
          </div>
        </div>
      </div>
    );
}