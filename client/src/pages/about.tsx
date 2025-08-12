import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Timeline from "@/components/timeline";

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("about.title")}
        description={t("about.description")}
        path="/about"
        schema={{ type: "artist" }}
      />
      <section className="pt-20 py-20 px-4 bg-gradient-to-br from-watercolor-sage via-watercolor-cream to-watercolor-ochre dark:from-watercolor-charcoal dark:via-gray-800 dark:to-watercolor-charcoal-light">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white mb-6">
              {t("about.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("about.description")}
            </p>
          </motion.div>

          <Timeline />
        </div>
      </section>
    </>
  );
}
