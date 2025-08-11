import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
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
import type { Artwork } from "@shared/schema";

export default function Home() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [isArtistDialogOpen, setIsArtistDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    year: "all",
    theme: "all",
    technique: "all",
    search: "",
  });

  const artworks = artworksData as Artwork[];

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      if (filters.year !== "all" && artwork.year.toString() !== filters.year)
        return false;
      if (filters.theme !== "all" && !artwork.tags?.includes(filters.theme))
        return false;
      if (
        filters.technique !== "all" &&
        artwork.technique !== filters.technique
      )
        return false;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const title = artwork.title.toLowerCase();
        const description = artwork.description.toLowerCase();
        const tags = artwork.tags?.join(" ").toLowerCase() || "";
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
  }, [artworks, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleArtworkClick = (id: string) => {
    setLocation(`/artwork/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>
          {t("hero.title")} {t("hero.subtitle")} - {t("site.fullTitle")}
        </title>
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-watercolor-ochre-accent to-watercolor-umber-accent text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                  onClick={() =>
                    document
                      .getElementById("gallery")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-testid="cta-button"
                >
                  {t("hero.cta")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-watercolor-ochre-accent text-watercolor-ochre-accent hover:bg-watercolor-ochre-accent hover:text-white px-8 py-3 rounded-full transition-all duration-300 font-medium"
                  onClick={() => setIsArtistDialogOpen(true)}
                  data-testid="artist-info-button"
                >
                  Poznaj Artystę
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Panel */}
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

        {/* Gallery Grid */}
        <section id="gallery" className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
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
                  Nie znaleziono dzieł spełniających kryteria wyszukiwania.
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    setFilters({
                      year: "all",
                      theme: "all",
                      technique: "all",
                      search: "",
                    })
                  }
                  data-testid="clear-filters"
                >
                  Wyczyść filtry
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Artist Info Dialog */}
        <Dialog open={isArtistDialogOpen} onOpenChange={setIsArtistDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-poppins text-2xl text-gray-800 dark:text-white mb-2">
                Zbigniew Jan Rutkowski
              </DialogTitle>
              <DialogDescription className="text-lg text-watercolor-ochre-accent font-medium">
                Malarz akwarelista z niemal 50-letnim doświadczeniem
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src="/3.jpg"
                  alt="Zbigniew Jan Rutkowski malujący na plenerze"
                  className="w-32 h-32 rounded-full object-cover mx-auto sm:mx-0 border-4 border-watercolor-ochre-accent"
                />
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">
                    <strong>Urodzony:</strong> 11 czerwca 1952 roku w Radomiu.
                  </p>
                  <p className="text-sm leading-relaxed mt-2">
                    <strong>Edukacja:</strong> W dzieciństwie uczeń Prywatnej
                    Szkoły Pana Wacława Dobrowolskiego. Absolwent Państwowego
                    Ogniska Plastycznego im. Jacka Malczewskiego w Radomiu
                    (1973-75), gdzie ukończył kursy z malarstwa, rysunku, rzeźby
                    i historii sztuki, otrzymując dyplom z wyróżnieniem "Za
                    wybitne osiągnięcia w dziale malarstwa".
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white">
                  Kariera i osiągnięcia
                </h4>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>
                    <strong>1968:</strong> Pierwsza indywidualna wystawa w
                    Klubie "Łączności" w Radomiu.
                  </li>
                  <li>
                    <strong>1987:</strong> Udział w plenerze w Wieliczce; prace
                    zlicytowano na rzecz ratowania kopalni. Otrzymał tytuł
                    "Honorowego Górnika Kopalni Soli".
                  </li>
                  <li>
                    <strong>Lata 90.:</strong> Namalował 14 stacji "Drogi
                    Krzyżowej" (olej) wg J. Mehoffera dla kościoła św. Jadwigi w
                    Radomiu.
                  </li>
                  <li>
                    Członek Zarządu Towarzystwa Przyjaciół Sztuk Pięknych (Dom
                    Gąski i Esterki), gdzie prowadził "Klub Plastyka Amatora".
                  </li>
                  <li>
                    Zdobywca I miejsca w dziale malarstwa i wyróżnienia w
                    grafice na przeglądach twórczości w Wojskach Lotniczych
                    (Warszawa, Poznań, Łódź, Tarnów).
                  </li>
                  <li>
                    Liczne wystawy indywidualne i zbiorowe, m.in. w WDK,
                    "Esterce", "Relaksie", Galerii "Izdebska-Łazorek" w
                    Kazimierzu Dolnym (Rynek 22), Bibliotece Pedagogicznej
                    (2013) oraz Miejskiej Bibliotece Publicznej w Radomiu
                    (2014).
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white">
                  Kolekcje i mecenat
                </h4>
                <p className="text-sm leading-relaxed">
                  Prace artysty znajdują się w prywatnych kolekcjach w{" "}
                  <strong>
                    Polsce, Szwecji, Argentynie, Austrii, Szwajcarii, Kanadzie i
                    USA
                  </strong>
                  . Znaczną część kolekcji stanowią dzieła w posiadaniu
                  wieloletniego przyjaciela i mecenasa artysty, Piotra Drózda
                  (właściciela firmy APM).
                </p>
              </div>

              <div className="bg-watercolor-cream dark:bg-gray-800 p-4 rounded-xl border border-watercolor-ochre-accent/20">
                <p className="text-sm italic text-center text-gray-600 dark:text-gray-400">
                  "Przez ponad 47 lat malarstwo akwarelowe było i jest moją
                  pasją oraz odskocznią od codziennego życia."
                </p>
                <p className="text-xs text-center mt-2 text-watercolor-ochre-accent font-medium">
                  - Zbigniew Jan Rutkowski
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
