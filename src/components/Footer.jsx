import React from "react";
import { Link } from "react-router-dom";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import {
  FaGlobe,
  FaApple,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1d1e1f] text-gray-300 py-8 px-6 xl:px-[5%]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 text-sm">
        <div>
          <h4 className="text-white text-lg mb-4 font-semibold">Key Series</h4>
          <ul>
            <li className="mb-2">
              <Link to="/series/t20-spring-challenge">
                T20 Spring Challenge [AUS]
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/series/womens-t20-world-cup">
                Women's T20 World Cup
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/series/india-vs-bangladesh">India vs Bangladesh</Link>
            </li>
            <li className="mb-2">
              <Link to="/series/india-vs-new-zealand">
                India vs New Zealand
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/series/india-women-vs-nz-women">
                India Women vs Zealand Women
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:mt-5">
          <ul>
            <li className="mb-2">
              <Link to="/series/pakistan-vs-england">Pakistan vs England</Link>
            </li>
            <li className="mb-2">
              <Link to="/series/sri-lanka-vs-west-indies">
                Sri Lanka vs West Indies
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/series/bangladesh-vs-south-africa">
                Bangladesh vs South Africa
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/series/usa-vs-nepal">USA vs Nepal</Link>
            </li>
            <li className="mb-2">
              <Link to="/series/wbbl-2024">WBBL 2024</Link>
            </li>
          </ul>
        </div>

        <div className="md:mt-5">
          <ul>
            <li className="mb-2">
              <Link to="/series/pakistan-vs-england">BBL 2024</Link>
            </li>
            <li className="mb-2">
              <Link to="/series/sri-lanka-vs-west-indies">Sheffield Field</Link>
            </li>
            <li className="mb-2">
              <Link to="/series/bangladesh-vs-south-africa">
                The Ford Trophy
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/series/usa-vs-nepal">One Day Cup(Australia)</Link>
            </li>
            <li className="mb-2">
              <Link to="/series/wbbl-2024">Cricket World Cup League</Link>
            </li>
          </ul>
        </div>

        <div className="md:mt-5">
          <ul>
            <li className="mb-2">
              <Link to="/series/pakistan-vs-england">Women's Championship</Link>
            </li>
            <li className="mb-2">
              <Link to="/series/sri-lanka-vs-west-indies">
                Women's Test Championship
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg md:mb-4 font-semibold">
            Quick Links
          </h4>
          <ul>
            <li className="mb-2">
              <Link to="/road-to-future">Road to Future</Link>
            </li>
            <li className="mb-2">
              <Link to="/timeout">TimeOut</Link>
            </li>
            <li className="mb-2">
              <Link to="/timeout-hindi">TimeOut Hindi</Link>
            </li>
            <li className="mb-2">
              <Link to="/icc-rankings">ICC Rankings</Link>
            </li>
            <li className="mb-2">
              <Link to="/hindi-videos">Hindi Videos</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg md:mb-4 font-semibold">
            Follow NS Sports
          </h4>
          <ul>
            <li className="mb-2">
              <Link to="/instagram">Instagram</Link>
            </li>
            <li className="mb-2">
              <Link to="/whatsapp">WhatsApp</Link>
            </li>
            <li className="mb-2">
              <Link to="/twitter">Twitter</Link>
            </li>
            <li className="mb-2">
              <Link to="/facebook">Facebook</Link>
            </li>
            <li className="mb-2">
              <Link to="/youtube">YouTube</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
        <h6 className="mb-2">
          <Link to="/terms">Terms of Use</Link> |{" "}
          <Link to="/privacy-policy">Privacy Policy</Link> |{" "}
          <Link to="/ads">Interest-Based Ads</Link> |{" "}
          <Link to="/feedback">Feedback</Link>
        </h6>
        <p>
          © {new Date().getFullYear()} NS Sports All rights reserved.
        </p>
      </div>
    </footer>
  );
}
