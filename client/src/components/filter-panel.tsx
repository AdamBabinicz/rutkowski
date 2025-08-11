import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

import artworksData from "@/data/artworks.json";
import { artworksSchema } from "@shared/schema";

interface FilterPanelProps {
  filters: {
    year: string;
    theme: string;
    technique: string;
    search: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export default function FilterPanel({
  filters,
  onFilterChange,
}: FilterPanelProps) {
  const { t } = useTranslation();

  const parsedArtworks = artworksSchema.parse(artworksData);

  // Poprawka: Użycie Array.from() zamiast [...]
  const years = Array.from(
    new Set(parsedArtworks.map((artwork) => artwork.year))
  )
    .sort((a, b) => b - a)
    .map(String);

  // Poprawka: Użycie Array.from() dla spójności
  const themes = Array.from(
    new Set(parsedArtworks.flatMap((artwork) => artwork.tags || []))
  );

  const techniques = ["akwarela", "olej", "grafika", "ołówek"];

  return (
    <section className="px-4 mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
          <h3 className="font-poppins font-semibold text-lg mb-4 text-gray-800 dark:text-white">
            {t("filter.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Year Filter */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("filter.year")}
              </Label>
              <Select
                value={filters.year}
                onValueChange={(value) => onFilterChange("year", value)}
              >
                <SelectTrigger data-testid="filter-year">
                  <SelectValue placeholder={t("filter.allYears")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("filter.allYears")}</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Theme Filter */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("filter.theme")}
              </Label>
              <Select
                value={filters.theme}
                onValueChange={(value) => onFilterChange("theme", value)}
              >
                <SelectTrigger data-testid="filter-theme">
                  <SelectValue placeholder={t("filter.allThemes")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("filter.allThemes")}</SelectItem>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {t(`themes.${theme}`, theme)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Technique Filter */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("filter.technique")}
              </Label>
              <Select
                value={filters.technique}
                onValueChange={(value) => onFilterChange("technique", value)}
              >
                <SelectTrigger data-testid="filter-technique">
                  <SelectValue placeholder={t("filter.allTechniques")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("filter.allTechniques")}
                  </SelectItem>
                  {techniques.map((technique) => (
                    <SelectItem key={technique} value={technique}>
                      {t(`techniques.${technique}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("filter.search")}
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("filter.searchPlaceholder")}
                  value={filters.search}
                  onChange={(e) => onFilterChange("search", e.target.value)}
                  className="pr-10"
                  data-testid="filter-search"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
