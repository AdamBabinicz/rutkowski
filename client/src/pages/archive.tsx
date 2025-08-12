import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const archivalPhotos = [
  {
    id: 1,
    src: "/archive/19.avif",
    altKey: "archive.photo1.alt",
    captionKey: "archive.photo1.caption",
  },
  {
    id: 2,
    src: "/archive/3.avif",
    altKey: "archive.photo2.alt",
    captionKey: "archive.photo2.caption",
  },
  {
    id: 3,
    src: "/archive/6.avif",
    altKey: "archive.photo3.alt",
    captionKey: "archive.photo3.caption",
  },
  {
    id: 4,
    src: "/archive/8.avif",
    altKey: "archive.photo4.alt",
    captionKey: "archive.photo4.caption",
  },
  {
    id: 5,
    src: "/archive/20.png",
    altKey: "archive.photo5.alt",
    captionKey: "archive.photo5.caption",
  },
  {
    id: 6,
    src: "/archive/1.avif",
    altKey: "archive.photo6.alt",
    captionKey: "archive.photo6.caption",
  },
];

export default function Archive() {
  const { t } = useTranslation();

  const relatedLinks = [
    {
      name: t("archive.relatedLinks.link1"),
      url: "https://ognisko.netlify.app/",
    },
    {
      name: t("archive.relatedLinks.link2"),
      url: "https://glogier.netlify.app/",
    },
    {
      name: t("archive.relatedLinks.link3"),
      url: "https://dobrowolski.netlify.app/",
    },
  ];

  return (
    <>
      <SEO
        title={t("archive.title")}
        description={t("archive.description")}
        path="/archive"
      />
      <main className="pt-20">
        <section className="pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-poppins font-bold text-4xl md:text-6xl text-gray-800 dark:text-white mb-6">
                {t("archive.title")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("archive.description")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-white/60 dark:bg-gray-800/60 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-poppins font-bold text-3xl text-gray-800 dark:text-white mb-4 text-center">
              {t("archive.history.title")}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-loose">
              <p>{t("archive.history.paragraph1")}</p>
              <p>{t("archive.history.paragraph2")}</p>
              <p>{t("archive.history.paragraph3")}</p>
            </div>
          </motion.div>
        </section>

        <section className="py-10 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-poppins font-bold text-2xl text-gray-800 dark:text-white mb-4 text-center">
              {t("archive.relatedLinks.title")}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {relatedLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-lg p-4 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center font-medium text-watercolor-ochre-accent dark:text-watercolor-ochre hover:text-watercolor-umber-accent"
                >
                  {link.name}
                  <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="px-4 pb-20 pt-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {archivalPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="overflow-hidden rounded-lg shadow-lg group bg-white/50 dark:bg-gray-800/50"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={photo.src}
                      alt={t(photo.altKey)}
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="p-4 text-sm text-center text-gray-700 dark:text-gray-300 min-h-[70px] flex items-center justify-center">
                    {t(photo.captionKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
