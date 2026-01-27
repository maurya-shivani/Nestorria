import { assets, cities } from "../assets/data";
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="pt-16 xl:pt-20 w-full text-gray-500 bg-[#fffbee]">
      <div className="max-padd-container">
        <hr className="border-gray-300 mt-8" />
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 mt-8">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href="https://prebuiltui.com">Copyright</a>. All rights
            reserved.
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Listing</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
