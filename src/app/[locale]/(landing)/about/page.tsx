import { HiOutlineClipboardList, HiOutlineCurrencyDollar, HiOutlineLockClosed } from "react-icons/hi";
import HomeArticle from "../../../_components/navbar/HomeArticle";
import Image from "next/image";
import landing from "@/assets/images/b429c932b5ec79c2ddbecf2fd627f80f51b28a62.jpg";
import money from "@/assets/images/8fec173425d90346aad93b80b44ebf2e06dd3b35.jpg";
import safety from "@/assets/images/28f5762daf02d251246eaa70cfe00f75a06b1214.jpg";
import maneg from "@/assets/images/278fae368f95c03abebc6bf8d80c94c4804abf00.jpg";
import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations('about_features');
  return (
    <div>
      <>
        <div className="relative z-6 h-screen w-full  border border-black shadow-[0px_4px_4px_0px_#00000040]">
          <Image fill src={landing} className="object-cover" alt="landing" />
        </div>

        <section className="py-39">
          <div className="container mx-auto px-4">
            <div className="space-y-24 leading-relaxed">
              <HomeArticle
                img={money.src}
                title={t(`money.title`)}
                titleIcon={
                  <HiOutlineCurrencyDollar className="w-8 h-8 text-primary" />
                }
                article={t(`money.description`)}
              />
              <HomeArticle
                img={safety.src}
                title={t(`privacy.title`)}
                titleIcon={
                  <HiOutlineLockClosed className="w-8 h-8 text-primary" />
                }
                article={t(`privacy.description`)}
                imageFirst={false}
              />
              <HomeArticle
                img={maneg.src}
                title={t(`management.title`)}
                titleIcon={
                  <HiOutlineClipboardList className="w-8 h-8 text-primary" />
                }
                article={t(`management.description`)}
              />
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
