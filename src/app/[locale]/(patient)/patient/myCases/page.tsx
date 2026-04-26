// import CaseCard from "@/app/_components/CaseCard";
// import PageHeader from "@/app/_components/PageHeader";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import React from "react";
// import { FaFilter } from "react-icons/fa";

// export default function page() {
//   return (
//     <section className="bg-[#F3F4FF] flex-1">
//       <div className="container mx-auto p-4">
//         <PageHeader
//           title="My Health Records"
//           desc="Manage and track all the dental cases you`ve posted. Stay updated on their status and see who is interested in helping you."
//         />
//         <div className="space-y-3 max-w-5xl mx-auto ">
//           <div className="bg-white shadow-md p-3 rounded-lg flex gap-4 items-center text-primary">
//             <FaFilter  size={22} color="" />
//             <Select >
//               <SelectTrigger className="w-full max-w-48">
//                 <SelectValue placeholder="filter by..." />
//               </SelectTrigger>

//               <SelectContent className="bg-white">
//                 <SelectGroup>
//                   <SelectLabel>Filter by</SelectLabel>
//                   <SelectItem value="Published">Published</SelectItem>
//                   <SelectItem value="Requested">Requested</SelectItem>
//                   <SelectItem value="Matched">Matched</SelectItem>
//                   <SelectItem value="Rejected">Rejected</SelectItem>
//                   <SelectItem value="Expired">Expired</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className=" bg-white shadow-md p-3 rounded-lg h-screen">
//             <CaseCard />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import CaseCard from "@/app/_components/CaseCard";
import PageHeader from "@/app/_components/PageHeader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTranslations } from "next-intl/server";
import React from "react";
import { FaFilter } from "react-icons/fa";

export default async function page() {
  // بنجيب الترجمة في السيرفر
  const t = await getTranslations("cases.MyCasesPage");

  return (
    <section className="bg-[#F3F4FF] flex-1">
      <div className="container mx-auto p-4">
        <PageHeader title={t("title")} desc={t("desc")} />
        <div className="space-y-3 max-w-5xl mx-auto ">
          <div className="bg-white shadow-md p-3 rounded-lg flex gap-4 items-center text-primary">
            <FaFilter size={22} color="" />
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={t("filterPlaceholder")} />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>{t("filterLabel")}</SelectLabel>
                  <SelectItem value="Published">
                    {t("statusPublished")}
                  </SelectItem>
                  <SelectItem value="Requested">
                    {t("statusRequested")}
                  </SelectItem>
                  <SelectItem value="Matched">{t("statusMatched")}</SelectItem>
                  <SelectItem value="Rejected">
                    {t("statusRejected")}
                  </SelectItem>
                  <SelectItem value="Expired">{t("statusExpired")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" bg-white shadow-md p-3 rounded-lg h-screen">
            <CaseCard />
          </div>
        </div>
      </div>
    </section>
  );
}
