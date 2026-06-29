import React from "react";
import { Link } from "react-router-dom"; // Kept this for your main KFC Logo link
import kfcFooter from "../../../assets/foot/kfcfooter.webp";
import googleplay from "../../../assets/foot/googleplay.webp";
import apple from "../../../assets/foot/apple.webp";
import phoneImg from "../../../assets/foot/phoneapp.webp";

const footerLinks = [
  {
    title: "Legal",
    links: [
      { name: "Terms and Conditions", href: "https://online.kfc.co.in/terms-and-conditions" },
      { name: "Privacy Center", href: "https://privacy.kfc.co.in/policies" },
      { name: "Disclaimer", href: "https://online.kfc.co.in/about-kfc/disclaimer" },
      { name: "Caution Notice", href: "https://online.kfc.co.in/about-kfc/caution-notice" },
    ],
  },
  {
    title: "KFC India",
    links: [
      { name: "About KFC", href: "https://online.kfc.co.in/about-kfc" },
      { name: "KFC Care", href: "https://online.kfc.co.in/about-kfc/kfc-care" },
      { name: "Careers", href: "https://online.kfc.co.in/about-kfc/careers" },
      { name: "Our Golden Past", href: "https://online.kfc.co.in/about-kfc/our-golden-past" },
      { name: "Responsible Disclosure", href: "https://bugcrowd.com/a19f4258-c79b-4a4f-a8bc-d924f85d5c53/external/report" },
    ],
  },
  {
    title: "KFC Food",
    links: [
      { name: "Menu", href: "/menu" },{ name: "Offers", href: "/deals" },
      { name: "Order Lookup", href: "https://online.kfc.co.in/order-lookup" },
      { name: "Gift Card", href: "https://online.kfc.co.in/giftcards" },
      { name: "Nutrition & Allergen", href: "https://online.kfc.co.in/about-kfc/nutrition" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Get Help", href: "https://online.kfc.co.in/help" },
      { name: "Contact Us", href: "https://online.kfc.co.in/contactus" },
      { name: "KFC Feedback", href: "https://feedback.kfcindia.co.in/" },
      { name: "Privacy Center", href: "https://privacy.kfc.co.in/policies" },
    ],
  },
];

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#202124] text-white pb-8 px-6 md:px-12 font-sans overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          {/* THE THREE RED LINES */}
          <div className="flex gap-2 pt-0">
            <div className="w-3 md:w-3 h-8 md:h-8 bg-[#e4002b]"></div>
            <div className="w-3 md:w-3 h-8 md:h-8 bg-[#e4002b]"></div>
            <div className="w-3 md:w-3 h-8 md:h-8 bg-[#e4002b]"></div>
          </div>
          
          {/* Top New App Download */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between pb-24 md:pb-32 mb-10 md:px-8">
            {/* Left Side: Text and Badges */}
            <div className="flex flex-col items-center md:items-start space-y-8 mt-10 md:mt-20">
              <h1 className="w-100 text-7xl md:text-7xl font-bebas tracking-tight uppercase text-center md:text-left">
                Download The New KFC App
              </h1>
              <div className="flex gap-4">
                <a
                  target="_blank"
                  
                  href="https://play.google.com/store/apps/details?id=com.yum.kfc"
                  className="block w-36 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={googleplay}
                    alt="Get it on Google Play"
                    className="w-full h-auto border border-gray-600 rounded-md"
                  />
                </a>
                <a
                  target="_blank"
                  
                  href="https://apps.apple.com/in/app/kfc-india-online-ordering-app/id915824379"
                  className="block w-36 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={apple}
                    alt="Download on the App Store"
                    className="w-full h-auto border border-gray-600 rounded-md"
                  />
                </a>
              </div>
            </div>

            {/* Right Side: Phone Image */}
            <div className="mt-16 md:mt-0 w-[280px] md:w-[350px] flex-shrink-0">
              <img
                src={phoneImg}
                alt="KFC App Interface"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-25">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={kfcFooter}
                  alt="KFC Logo"
                  className="w-[70px] h-auto object-contain hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
              {footerLinks.map((section, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  <h3 className="font-semibold text-[15px]">{section.title}</h3>
                  <ul className="flex flex-col space-y-3 text-[14px]">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.href}
                          
                          rel="noopener noreferrer"
                          className="hover:text-gray-300 transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          {/* Find A KFC */}
            <a 
              href="https://restaurants.kfc.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-start gap-2 cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#e4002b] group-hover:text-red-500 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold text-[15px] underline hover:no-underline underline-offset-4 text-white">
                Find A KFC
              </span>
            </a>

            {/* App Store Buttons */}
            <div className="flex flex-col space-y-4 flex-shrink-0">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://play.google.com/store/apps/details?id=com.yum.kfc"
                className="block w-36 hover:opacity-80 transition-opacity"
              >
                <img
                  src={googleplay}
                  alt="Get it on Google Play"
                  className="w-full h-auto border border-gray-600 rounded-md"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://apps.apple.com/in/app/kfc-india-online-ordering-app/id915824379"
                className="block w-36 hover:opacity-80 transition-opacity"
              >
                <img
                  src={apple}
                  alt="Download on the App Store"
                  className="w-full h-auto border border-gray-600 rounded-md"
                />
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-6">
            <p>
              Copyright © KFC Corporation 2026 All rights reserved build
              pwa-2509-1-1_b7b0fc5b
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/kfcindia_official/"
                className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#202124] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/KFCIndia"
                className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#202124] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/KFC_India"
                className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#202124] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;