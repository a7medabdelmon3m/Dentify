import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-[#84848480]">
      <div className="container px-4 py-6 mx-auto  ">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-text-black max-w-88">
              {t(`description`)}
            </p>
            <div className="space-y-4 w-fit mt-14">
              <span className=" text-text-body font-medium text-[28px] ">
                {t(`follow_us`)}
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
                {t(`quick_links.title`)}
              </h3>
              <ul className="space-y-5 text-primary ">
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                   {t(`quick_links.home`)}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/about"}>
                    {t(`quick_links.about`)}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    {t(`quick_links.faq`)}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    {t(`quick_links.contact`)}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    {t(`quick_links.privacy`)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="text-text-title font-heading font-bold">{t(`help.title`)}</h3>
              <ul className="space-y-5 text-primary ">
                <li>
                  <Link className="hover:text-primary-hover" href={"/"}>
                    {t(`help.payments`)}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/about"}>
                    {t(`help.returns`)}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-hover" href={"/about"}>
                    {t(`help.privacy_policy`)}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-black text-center text-text-body ">
          {t(`rights`)}
          <p>{t(`developer`)}</p>
        </div>
      </div>
    </footer>
  );
}
