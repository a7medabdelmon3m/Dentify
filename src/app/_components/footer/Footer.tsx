import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-[#84848480]">
      <div className="container px-4 py-6 mx-auto  ">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-text-black max-w-88">
              Lorem ipsum is a dummy or placeholder text Commonly used in
              graphic design, publishing, and web development to fill empty
              spaces in a layout that does not yet have content.
            </p>
            <div className="space-y-4 w-fit mt-14">
              <span className=" text-text-body font-medium text-[28px] ">
                Follow us on
              </span>
              <div className="flex gap-3 justify-between text-2xl">
                <a href="www.twitter.com" className="text-primary hover:text-primary-hover transition-colors duration-100">
                  <FaTwitter />
                </a>
                <a href="www.facebook.com" className="text-primary hover:text-primary-hover transition-colors duration-100">
                  <FaFacebook />
                </a>
                <a href="www.instagram.com" className="text-primary hover:text-primary-hover transition-colors duration-100">
                  <PiInstagramLogoFill />
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-8">
              <h3 className="text-text-title font-heading font-bold">
                Quick Links
              </h3>
              <ul className="space-y-5 text-primary ">
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/about"}>
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="text-text-title font-heading font-bold">Help</h3>
              <ul className="space-y-5 text-primary ">
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    Payments
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/about"}>
                    Returns
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/about"}>
                    privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-black text-center text-text-body ">
          <p>© 2026 Dentify. All rights reserved</p>
          <p>Developed with care by Ahmed Abdelmonem.</p>
        </div>
      </div>
    </footer>
  );
}
