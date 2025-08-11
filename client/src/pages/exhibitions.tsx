import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const exhibitionsData = [
  {
    year: "1968",
    titleKey: "exhibitions.exhibition1968.title",
    locationKey: "exhibitions.exhibition1968.location",
    descriptionKey: "exhibitions.exhibition1968.description",
    imageUrl: "/exhibitions/5.jpg",
  },
  {
    year: "1987",
    titleKey: "exhibitions.exhibition1987.title",
    locationKey: "exhibitions.exhibition1987.location",
    descriptionKey: "exhibitions.exhibition1987.description",
    imageUrl: "/exhibitions/3.jpg",
  },
  {
    year: "Lata 90.",
    titleKey: "exhibitions.exhibition1990s.title",
    locationKey: "exhibitions.exhibition1990s.location",
    descriptionKey: "exhibitions.exhibition1990s.description",
    imageUrl: "/exhibitions/14.jpg",
  },
  {
    year: "Aktywność Ciągła",
    titleKey: "exhibitions.exhibitionOngoing.title",
    locationKey: "exhibitions.exhibitionOngoing.location",
    descriptionKey: "exhibitions.exhibitionOngoing.description",
    imageUrl: "/exhibitions/17.jpg",
  },
  {
    year: "2013",
    titleKey: "exhibitions.exhibition2013.title",
    locationKey: "exhibitions.exhibition2013.location",
    descriptionKey: "exhibitions.exhibition2013.description",
    imageUrl: "/exhibitions/13.jpg",
  },
  {
    year: "2014",
    titleKey: "exhibitions.exhibition2014.title",
    locationKey: "exhibitions.exhibition2014.location",
    descriptionKey: "exhibitions.exhibition2014.description",
    imageUrl: "/exhibitions/11.jpg",
  },
  {
    year: "2015",
    titleKey: "exhibitions.exhibition2015.title",
    locationKey: "exhibitions.exhibition2015.location",
    descriptionKey: "exhibitions.exhibition2015.description",
    imageUrl: "/exhibitions/10.jpg",
  },
  {
    year: "2018",
    titleKey: "exhibitions.exhibition2018.title",
    locationKey: "exhibitions.exhibition2018.location",
    descriptionKey: "exhibitions.exhibition2018.description",
    imageUrl: "/exhibitions/15.jpg",
  },
];

export default function Exhibitions() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t("exhibitions.title")} - {t("site.fullTitle")}
        </title>
        <meta name="description" content={t("exhibitions.description")} />
      </Helmet>

      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-poppins font-bold text-4xl md:text-6xl text-gray-800 dark:text-white mb-6">
                {t("exhibitions.title")}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("exhibitions.description")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-watercolor-ochre-accent dark:border-watercolor-ochre ml-4">
              {exhibitionsData.map((exhibition, index) => (
                <motion.div
                  key={index}
                  className="mb-12 pl-8 relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="absolute -left-4 top-0 w-8 h-8 bg-watercolor-ochre-accent dark:bg-watercolor-ochre rounded-full border-4 border-background dark:border-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8 items-center`}
                  >
                    <img
                      src={exhibition.imageUrl}
                      alt={t(exhibition.titleKey)}
                      className="w-full md:w-1/2 rounded-lg shadow-xl"
                    />
                    <div className="flex-1">
                      <p className="font-poppins font-semibold text-xl text-watercolor-ochre-accent dark:text-watercolor-ochre">
                        {exhibition.year}
                      </p>
                      <h3 className="font-poppins font-bold text-2xl text-gray-800 dark:text-white mt-1 mb-2">
                        {t(exhibition.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {t(exhibition.locationKey)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t(exhibition.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
