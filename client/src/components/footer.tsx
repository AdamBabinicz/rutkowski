import { useTranslation } from "react-i18next";
import { Link } from "wouter";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-watercolor-umber-accent dark:bg-watercolor-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-poppins font-bold text-xl">
              {t("site.title")}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-watercolor-ochre-deep rounded-full flex items-center justify-center text-white hover:bg-watercolor-umber-deep transition-colors"
                data-testid="social-instagram"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a
                href="https://www.facebook.com/zbigniewjan.rutkowski"
                className="w-8 h-8 bg-watercolor-blue-deep rounded-full flex items-center justify-center text-white hover:bg-watercolor-sage-deep transition-colors"
                data-testid="social-facebook"
              >
                <i className="fab fa-facebook text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-watercolor-sage-deep rounded-full flex items-center justify-center text-white hover:bg-watercolor-ochre-deep transition-colors"
                data-testid="social-linkedin"
              >
                <i className="fab fa-linkedin text-sm"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-poppins font-semibold mb-4">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-watercolor-ochre transition-colors"
                >
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/exhibitions"
                  className="text-gray-300 hover:text-watercolor-sage transition-colors"
                >
                  {t("nav.exhibitions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/archive"
                  className="text-gray-300 hover:text-watercolor-umber transition-colors"
                >
                  {t("nav.archive")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-watercolor-sage transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-watercolor-umber transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold mb-4">
              {t("footer.categories")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-watercolor-ochre transition-colors"
                >
                  {t("themes.pejzaz")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-watercolor-sage transition-colors"
                >
                  {t("themes.portret")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-watercolor-umber transition-colors"
                >
                  {t("themes.abstrakcja")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-watercolor-blue transition-colors"
                >
                  {t("themes.natura")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold mb-4">
              {t("footer.contact")}
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center">
                <i className="fas fa-envelope w-4 mr-3 text-watercolor-ochre"></i>
                <span>Zbyszior52@wp.pl</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone w-4 mr-3 text-watercolor-sage"></i>
                <span>600 252 658</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt w-4 mr-3 mt-0.5 text-watercolor-umber"></i>
                <span>
                  Radom
                  <br />
                  Polska
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t("footer.copyright")}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/cookies-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("footer.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
