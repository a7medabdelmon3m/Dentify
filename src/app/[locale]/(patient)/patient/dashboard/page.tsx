import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { FaPhone, FaSearch } from "react-icons/fa";
import me from "@/assets/images/patient.jpg";
import CreateCaseContainer from "./CreateCaseContainer";
import { MdOutlineEmail } from "react-icons/md";
import PageHeader from "@/app/_components/PageHeader";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("PatientProfile");

  return (
    <section className="bg-[#F3F4FF] flex-1">
      <div className="container px-4 py-4 mx-auto ">
        <div className="container p-4  mx-auto ">
          <PageHeader
            title={t("headerTitle")}
            desc={t("headerDesc")}
          />
        </div>

        <div className="border-2 border-white bg-white rounded-[20px] overflow-hidden shadow-sm mb-10">
          <div className="bg-linear-to-r from-primary to-primary-hover min-h-35 md:min-h-40 overflow-hidden relative">
            <div className="absolute w-64 h-64 rounded-full bg-[#2E52B2]/50 right-1/2 translate-x-1/2  top-8 md:right-10 md:translate-0 shrink-0 "></div>
          </div>

          <div className="relative px-6 pb-8 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="relative col-span-1 -mt-16 md:-mt-20 flex flex-col items-center md:items-start">
                <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 md:border-8 border-white shadow-md">
                  <Image fill className="object-cover" src={me} alt="user" />
                </div>
                <div className="mt-4 flex flex-col items-center md:items-start">
                  <h3 className="text-text-title text-2xl md:text-3xl font-bold font-heading text-center md:text-left">
                    Essam Azzam
                  </h3>
                  <span className="inline-block w-fit px-3 py-1 mt-1 text-sm font-semibold text-primary bg-primary/10 rounded-md border border-primary/20">
                    {t("userRole")}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col sm:flex-row gap-6 lg:gap-12 mt-6 lg:mt-8 ">
                <div className="lg:mt-8 space-y-3 flex-1 flex flex-col items-center sm:items-start">
                  <p className="text-sm md:text-base text-text-muted font-medium uppercase tracking-wider text-center sm:text-left">
                    {t("phoneLabel")}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 w-full">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#0DF22F] rounded-full text-white shadow-lg shadow-[#0DF22F]/20">
                      <FaPhone size={18} />
                    </div>
                    <span className="text-base md:text-lg text-text-body font-bold">
                      +12 345 6789 0
                    </span>
                  </div>
                </div>

                <div className="lg:mt-8 space-y-3 flex-1 flex flex-col items-center sm:items-start">
                  <p className="text-sm md:text-base text-text-muted font-medium uppercase tracking-wider text-center sm:text-left">
                    {t("emailLabel")}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 w-full">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#0DF22F] rounded-full text-white shadow-lg shadow-[#0DF22F]/20">
                      <MdOutlineEmail size={20} />
                    </div>
                    <span className="text-base md:text-lg text-text-body font-bold">
                      jordan@mail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateCaseContainer />
      </div>
    </section>
  );
}