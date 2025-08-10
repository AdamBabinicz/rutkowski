import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { href: "/", label: t("nav.gallery") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`${
            mobile ? "block py-2" : ""
          } text-gray-700 dark:text-gray-300 hover:text-watercolor-ochre-accent dark:hover:text-watercolor-ochre transition-colors font-medium ${
            location === href ? "text-watercolor-ochre-accent dark:text-watercolor-ochre" : ""
          }`}
          onClick={() => mobile && setIsOpen(false)}
          data-testid={`nav-link-${href.replace("/", "") || "home"}`}
        >
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-testid="logo">
            <h1 className="font-poppins font-bold text-xl text-gray-800 dark:text-white">
              {t("site.title")}{" "}
              <span className="text-watercolor-ochre-accent dark:text-watercolor-ochre">
                {t("site.artistName")}
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={i18n.language} onValueChange={changeLanguage}>
              <SelectTrigger 
                className="w-16 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600"
                data-testid="language-selector"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pl" data-testid="lang-pl">PL</SelectItem>
                <SelectItem value="en" data-testid="lang-en">EN</SelectItem>
                <SelectItem value="fr" data-testid="lang-fr">FR</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 hover:bg-watercolor-blue dark:hover:bg-gray-700"
              data-testid="theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 text-gray-600" />
              ) : (
                <Sun className="h-4 w-4 text-yellow-400" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600"
                  data-testid="mobile-menu-button"
                >
                  <Menu className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
