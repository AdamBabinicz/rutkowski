import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import FilterPanel from "@/components/filter-panel";
import ArtworkCard from "@/components/artwork-card";
import artworksData from "@/data/artworks.json";
import type { Artwork } from "@shared/schema";

export default function Home() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState({
    year: "all",
    theme: "all",
    technique: "all",
    search: "",
  });

  const artworks = artworksData as Artwork[];

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      if (filters.year !== "all" && artwork.year.toString() !== filters.year) return false;
      if (filters.theme !== "all" && !artwork.tags?.includes(filters.theme)) return false;
      if (filters.technique !== "all" && artwork.technique !== filters.technique) return false;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const title = artwork.title.toLowerCase();
        const description = artwork.description.toLowerCase();
        const tags = artwork.tags?.join(" ").toLowerCase() || "";
        if (!title.includes(searchTerm) && !description.includes(searchTerm) && !tags.includes(searchTerm)) {
          return false;
        }
      }
      return true;
    });
  }, [artworks, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArtworkClick = (id: string) => {
    setLocation(`/artwork/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>{t("hero.title")} {t("hero.subtitle")} - {t("site.fullTitle")}</title>
        <meta name="description" content={t("hero.description")} />
      </Helmet>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-poppins font-bold text-4xl md:text-6xl text-gray-800 dark:text-white mb-6">
                {t("hero.title")} <br />
                <span className="bg-gradient-to-r from-watercolor-ochre-accent to-watercolor-umber-accent bg-clip-text text-transparent">
                  {t("hero.subtitle")}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("hero.description")}
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-watercolor-ochre-accent to-watercolor-umber-accent text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="cta-button"
              >
                {t("hero.cta")}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Filter Panel */}
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

        {/* Gallery Grid */}
        <section id="gallery" className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="gallery-grid">
                {filteredArtworks.map((artwork, index) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    index={index}
                    onClick={() => handleArtworkClick(artwork.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16" data-testid="no-results">
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                  Nie znaleziono dzieł spełniających kryteria wyszukiwania.
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters({ year: "all", theme: "all", technique: "all", search: "" })}
                  data-testid="clear-filters"
                >
                  Wyczyść filtry
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
