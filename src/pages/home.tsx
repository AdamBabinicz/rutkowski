import SEO from "@/components/SEO";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import FilterPanel from "@/components/filter-panel";
import ArtworkCard from "@/components/artwork-card";
import artworksData from "@/data/artworks.json";
import { artworksSchema } from "@shared/schema";
import { useQueryString } from "@/hooks/use-query-string";

function normalize(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function Home() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [isArtistDialogOpen, setIsArtistDialogOpen] = useState(false);

  const searchParams = useQueryString();

  const filters = useMemo(() => {
    return {
      year: searchParams.get("year") || "all",
      theme: searchParams.get("theme") || "all",
      technique: searchParams.get("technique") || "all",
      search: searchParams.get("search") || "",
    };
  }, [searchParams]);

  useEffect(() => {
    const isAnyFilterActive =
      filters.theme !== "all" ||
      filters.year !== "all" ||
      filters.technique !== "all" ||
      filters.search !== "";

    if (isAnyFilterActive) {
      const gallerySection = document.getElementById("gallery-section");
      if (gallerySection) {
        setTimeout(() => {
          gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [filters]);

  const parsedArtworks = artworksSchema.parse(artworksData);
  const featuredArtwork = parsedArtworks[0];

  const filteredArtworks = useMemo(() => {
    return parsedArtworks.filter((artwork) => {
      if (filters.year !== "all" && artwork.year.toString() !== filters.year)
        return false;

      if (
        filters.theme !== "all" &&
        !artwork.tags?.some(
          (tag) => normalize(tag) === normalize(filters.theme)
        )
      )
        return false;

      if (
        filters.technique !== "all" &&
        normalize(artwork.technique) !== normalize(filters.technique)
      )
        return false;

      if (filters.search) {
        const searchTerm = normalize(filters.search);
        const title = normalize(artwork.title);
        const description = normalize(artwork.description);
        const tags = normalize(artwork.tags?.join(" ") || "");
        if (
          !title.includes(searchTerm) &&
          !description.includes(searchTerm) &&
          !tags.includes(searchTerm)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [parsedArtworks, filters]);

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search);
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    const newSearch = newParams.toString();
    setLocation(newSearch ? `?${newSearch}` : "/", { replace: true });
  };

  const handleArtworkClick = (id: string) => {
    setLocation(`/artwork/${id}`);
  };

  return (
    <>
      <SEO
        title={t("seo.defaultTitle")}
        description={t("seo.defaultDescription")}
        isHomePage={true}
        image={featuredArtwork.ogImageUrl || featuredArtwork.imageUrl}
        path="/"
        schema={{ type: "website" }}
      />
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-poppins font-bold text-4xl md:text-6xl text-gray-800 dark:text-white mb-6">
                {t("hero.title")} <br />
                <span className="bg-gradient-to-r from-[var(--watercolor-ochre-accent)] to-[var(--watercolor-umber-accent)] bg-clip-text text-transparent">
                  {t("hero.subtitle")}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* CTA – gradient jasny w dark mode → ciemny tekst w dark */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[var(--watercolor-ochre-accent)] to-[var(--watercolor-umber-accent)] text-white dark:!text-[var(--watercolor-charcoal)] hover:shadow-lg transition-all duration-300 font-medium"
                  onClick={() =>
                    document
                      .getElementById("gallery-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-testid="cta-button"
                >
                  {t("hero.cta")}
                </Button>

                {/* Outline – normalnie akcent jako kolor tekstu; w dark → ciemny tekst; na hover w light → biały; w dark → ciemny */}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[var(--watercolor-ochre-accent)] text-[var(--watercolor-ochre-accent)] dark:!text-[var(--watercolor-charcoal)] hover:bg-[var(--watercolor-ochre-accent)] hover:text-white dark:hover:!text-[var(--watercolor-charcoal)] rounded-full transition-all duration-300 font-medium px-8 py-3"
                  onClick={() => setIsArtistDialogOpen(true)}
                  data-testid="artist-info-button"
                >
                  {t("hero.artistInfoButton")}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

        <section
          id="gallery-section"
          className="px-4 pb-20"
          aria-labelledby="gallery-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2 id="gallery-heading" className="sr-only">
              {t("gallery.heading")}
            </h2>
            {filteredArtworks.length > 0 ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                data-testid="gallery-grid"
              >
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
                  {t("gallery.noResults")}
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setLocation("/")}
                  data-testid="clear-filters"
                >
                  {t("gallery.clearFilters")}
                </Button>
              </div>
            )}
          </div>
        </section>

        <Dialog open={isArtistDialogOpen} onOpenChange={setIsArtistDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-poppins text-2xl text-gray-800 dark:text-white mb-2">
                {t("home.artistDialog.name")}
              </DialogTitle>
              <DialogDescription className="text-lg text-[var(--watercolor-ochre-accent)] font-medium">
                {t("home.artistDialog.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src="/3.avif"
                  alt={t("home.artistDialog.alt")}
                  className="w-32 h-32 rounded-full object-cover mx-auto sm:mx-0 border-4 border-[var(--watercolor-ochre-accent)]"
                />
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">
                    <strong>{t("home.artistDialog.bornLabel")}</strong>{" "}
                    {t("home.artistDialog.bornText")}
                  </p>
                  <p className="text-sm leading-relaxed mt-2">
                    <strong>{t("home.artistDialog.educationLabel")}</strong>{" "}
                    {t("home.artistDialog.educationText")}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white">
                  {t("home.artistDialog.careerTitle")}
                </h4>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>
                    <strong>{t("home.artistDialog.career1.year")}</strong>{" "}
                    {t("home.artistDialog.career1.event")}
                  </li>
                  <li>
                    <strong>{t("home.artistDialog.career2.year")}</strong>{" "}
                    {t("home.artistDialog.career2.event")}
                  </li>
                  <li>
                    <strong>{t("home.artistDialog.career3.year")}</strong>{" "}
                    {t("home.artistDialog.career3.event")}
                  </li>
                  <li>{t("home.artistDialog.career4.event")}</li>
                  <li>{t("home.artistDialog.career5.event")}</li>
                  <li>{t("home.artistDialog.career6.event")}</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white">
                  {t("home.artistDialog.collectionsTitle")}
                </h4>
                <p className="text-sm leading-relaxed">
                  {t("home.artistDialog.collectionsText1")}{" "}
                  <strong>{t("home.artistDialog.collectionsCountries")}</strong>
                  . {t("home.artistDialog.collectionsText2")}
                </p>
              </div>
              <div className="bg-[var(--watercolor-cream)] dark:bg-gray-800 p-4 rounded-xl border border-[color:var(--watercolor-ochre-accent)]/20">
                <p className="text-sm italic text-center text-gray-600 dark:text-gray-400">
                  "{t("home.artistDialog.quote")}"
                </p>
                <p className="text-xs text-center mt-2 text-[var(--watercolor-ochre-accent)] font-medium">
                  - {t("home.artistDialog.name")}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
