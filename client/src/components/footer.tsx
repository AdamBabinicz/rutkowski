import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-watercolor-charcoal dark:bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-poppins font-bold text-xl">Atlas Twórczości</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-watercolor-lavender-deep rounded-full flex items-center justify-center text-white hover:bg-watercolor-peach-deep transition-colors"
                data-testid="social-instagram"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-watercolor-blue-deep rounded-full flex items-center justify-center text-white hover:bg-watercolor-sage-deep transition-colors"
                data-testid="social-facebook"
              >
                <i className="fab fa-facebook text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-watercolor-sage-deep rounded-full flex items-center justify-center text-white hover:bg-watercolor-lavender-deep transition-colors"
                data-testid="social-linkedin"
              >
                <i className="fab fa-linkedin text-sm"></i>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">{t("footer.navigation")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-watercolor-lavender transition-colors">
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-watercolor-sage transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-watercolor-peach transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-watercolor-blue transition-colors">
                  {t("nav.blog")}
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">{t("footer.categories")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-watercolor-lavender transition-colors">
                  {t("themes.pejzaz")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-watercolor-sage transition-colors">
                  {t("themes.portret")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-watercolor-peach transition-colors">
                  {t("themes.abstrakcja")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-watercolor-blue transition-colors">
                  {t("themes.natura")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">{t("footer.contact")}</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center">
                <i className="fas fa-envelope w-4 mr-3 text-watercolor-peach"></i>
                <span>m.rutkowski@artystyka.pl</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone w-4 mr-3 text-watercolor-sage"></i>
                <span>+48 123 456 789</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt w-4 mr-3 mt-0.5 text-watercolor-lavender"></i>
                <span>
                  ul. Artystyczna 15<br />
                  31-000 Kraków
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t("footer.copyright")}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t("footer.terms")}
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t("footer.cookies")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
