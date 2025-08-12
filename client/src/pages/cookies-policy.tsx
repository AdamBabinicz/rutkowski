import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

export default function CookiesPolicy() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("cookies.title")}
        description={t("cookies.description")}
        path="/cookies-policy"
      />
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/50 dark:bg-gray-800/50 p-8 rounded-lg shadow-lg"
            >
              <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 dark:text-white mb-6 text-center">
                {t("cookies.title")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
                {t("cookies.lastUpdated")}
              </p>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>{t("cookies.intro")}</p>

                <h2 className="font-poppins font-semibold text-2xl">
                  {t("cookies.section1.title")}
                </h2>
                <p>{t("cookies.section1.content")}</p>

                <h2 className="font-poppins font-semibold text-2xl">
                  {t("cookies.section2.title")}
                </h2>
                <p>{t("cookies.section2.content")}</p>

                <h2 className="font-poppins font-semibold text-2xl">
                  {t("cookies.section3.title")}
                </h2>
                <p>{t("cookies.section3.content")}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
