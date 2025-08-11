import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t("privacy.title")} - {t("site.fullTitle")}
        </title>
        <meta name="description" content={t("privacy.description")} />
      </Helmet>
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
                {t("privacy.title")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
                {t("privacy.lastUpdated")}
              </p>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>{t("privacy.intro")}</p>

                <h2 className="font-poppins font-semibold text-2xl">
                  {t("privacy.section1.title")}
                </h2>
                <p>{t("privacy.section1.content")}</p>

                <h2 className="font-poppins font-semibold text-2xl">
                  {t("privacy.section2.title")}
                </h2>
                <p>{t("privacy.section2.content")}</p>

                <h2 className="font-poppins font-semibold text-2xl">
                  {t("privacy.section3.title")}
                </h2>
                <p>{t("privacy.section3.content")}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
