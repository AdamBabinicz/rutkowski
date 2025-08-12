import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import type { Artwork } from "@shared/schema";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}

export default function ArtworkCard({
  artwork,
  index,
  onClick,
}: ArtworkCardProps) {
  const { t, i18n } = useTranslation();

  const getTitle = () => {
    switch (i18n.language) {
      case "en":
        return artwork.titleEn || artwork.title;
      case "fr":
        return artwork.titleFr || artwork.title;
      default:
        return artwork.title;
    }
  };

  const getDescription = () => {
    switch (i18n.language) {
      case "en":
        return artwork.descriptionEn || artwork.description;
      case "fr":
        return artwork.descriptionFr || artwork.description;
      default:
        return artwork.description;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="watercolor-hover cursor-pointer"
      onClick={onClick}
      data-testid={`artwork-card-${artwork.id}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-watercolor-blue/20 dark:border-gray-700">
        <img
          src={artwork.imageUrl}
          alt={getTitle()}
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-2 truncate">
            {getTitle()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {artwork.year} • {t(`techniques.${artwork.technique}`)}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {artwork.tags?.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-watercolor-sage text-gray-700 dark:text-gray-300 text-xs"
              >
                {t(`themes.${tag}`, tag) || tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {getDescription().substring(0, 100)}...
          </p>
        </div>
      </div>
    </motion.div>
  );
}
