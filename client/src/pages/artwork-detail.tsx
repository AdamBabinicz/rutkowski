import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import ImageSlider from "@/components/image-slider";
import ImageModal from "@/components/image-modal";
import NotFound from "@/pages/not-found";
import artworksData from "@/data/artworks.json";
import { artworksSchema, type Artwork } from "@shared/schema";

export default function ArtworkDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  const artworks = artworksSchema.parse(artworksData);
  const artwork = artworks.find((a) => a.id === id);

  if (!artwork) {
    return <NotFound />;
  }

  const getLocalized = (field: "title" | "description" | "story") => {
    const lang = i18n.language;
    let key: keyof Artwork;

    switch (lang) {
      case "en":
        key = `${field}En` as keyof Artwork;
        break;
      case "fr":
        key = `${field}Fr` as keyof Artwork;
        break;
      default:
        key = field;
        break;
    }
    return (artwork[key] || artwork[field]) as string;
  };

  const handleImageClick = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const images =
    artwork.imageUrls && artwork.imageUrls.length > 0
      ? artwork.imageUrls
      : [artwork.imageUrl];

  return (
    <>
      <Helmet>
        <title>{getLocalized("title")} - Atlas Twórczości Rutkowskiego</title>
        <meta
          name="description"
          content={getLocalized("description").substring(0, 160)}
        />
        <meta property="og:title" content={getLocalized("title")} />
        <meta
          property="og:description"
          content={getLocalized("description").substring(0, 160)}
        />
        <meta property="og:image" content={artwork.imageUrl} />
      </Helmet>

      <section className="pt-20 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-watercolor-ochre-accent dark:hover:text-watercolor-ochre transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("artwork.backToGallery")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg flex items-center justify-center max-h-[85vh] p-4">
                <ImageSlider
                  images={images}
                  alt={getLocalized("title")}
                  onImageClick={handleImageClick}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="font-poppins font-bold text-3xl text-gray-800 dark:text-white mb-2">
                  {getLocalized("title")}
                </h1>
                <p className="text-watercolor-ochre-accent dark:text-watercolor-ochre font-medium text-lg">
                  {artwork.year} • {t(`techniques.${artwork.technique}`)}
                </p>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
                <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-3">
                  {t("artwork.details")}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {t("artwork.dimensions")}:
                    </span>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {artwork.dimensions}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {t("artwork.technique")}:
                    </span>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {t(`techniques.${artwork.technique}`)}
                    </p>
                  </div>
                  {artwork.substrate && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {t("artwork.substrate")}:
                      </span>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {t(
                          `artwork.substrates.${artwork.substrate}`,
                          artwork.substrate
                        )}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {t("artwork.status")}:
                    </span>
                    <p
                      className={`font-medium ${
                        artwork.available
                          ? "text-watercolor-ochre-accent dark:text-watercolor-ochre"
                          : "text-watercolor-umber-accent dark:text-watercolor-umber"
                      }`}
                    >
                      {artwork.available
                        ? t("artwork.available")
                        : t("artwork.sold")}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-3">
                  {t("artwork.tags")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags?.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-watercolor-sage text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {t(`themes.${tag}`, tag) as string}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-3">
                  {t("artwork.description")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {getLocalized("description")}
                </p>
              </div>

              {getLocalized("story") && (
                <div className="bg-gradient-to-r from-watercolor-ochre/30 to-watercolor-umber/30 dark:from-gray-700/30 dark:to-gray-600/30 rounded-xl p-4 border-l-4 border-watercolor-ochre-accent">
                  <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-2">
                    <i className="fas fa-quote-left text-watercolor-ochre-accent mr-2"></i>
                    {t("artwork.story")}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{getLocalized("story")}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={modalImageUrl}
        alt={getLocalized("title")}
      />
    </>
  );
}
