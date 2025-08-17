import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useQueryString } from "@/hooks/use-query-string";

interface FooterProps {
  onAnnouncementClick: () => void;
}

export default function Footer({ onAnnouncementClick }: FooterProps) {
  const { t } = useTranslation();
  const searchParams = useQueryString();

  const activeTheme = searchParams.get("theme");

  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const copyrightDate =
    currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;

  const categoryClass = (theme: string, hoverColor: string) =>
    `cursor-pointer text-sm transition-colors ${
      activeTheme === theme
        ? "text-white font-semibold"
        : `text-gray-300 ${hoverColor}`
    }`;

  return (
    <footer className="bg-watercolor-umber-accent dark:bg-watercolor-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-poppins font-bold text-xl">{t("nav.brand")}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/zbigniewjan.rutkowski"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-watercolor-blue-deep rounded-full flex items-center justify-center text-white hover:bg-watercolor-sage-deep transition-colors"
                data-testid="social-facebook"
                aria-label="Odwiedź profil na Facebooku"
              >
                <i className="fab fa-facebook text-sm"></i>
              </a>
              <a
                href="https://m.me/zbigniewjan.rutkowski"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                data-testid="social-messenger"
                aria-label="Skontaktuj się przez Messenger"
              >
                <i className="fab fa-facebook-messenger text-sm"></i>
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
            <ul className="space-y-2">
              <li>
                <Link
                  href="/?theme=landscape"
                  className={categoryClass(
                    "landscape",
                    "hover:text-watercolor-ochre"
                  )}
                >
                  {t("themes.landscape")}
                </Link>
              </li>
              <li>
                <Link
                  href="/?theme=portrait"
                  className={categoryClass(
                    "portrait",
                    "hover:text-watercolor-sage"
                  )}
                >
                  {t("themes.portrait")}
                </Link>
              </li>
              <li>
                <Link
                  href="/?theme=architecture"
                  className={categoryClass(
                    "architecture",
                    "hover:text-watercolor-umber"
                  )}
                >
                  {t("themes.architecture")}
                </Link>
              </li>
              <li>
                <Link
                  href="/?theme=nature"
                  className={categoryClass(
                    "nature",
                    "hover:text-watercolor-blue"
                  )}
                >
                  {t("themes.nature")}
                </Link>
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
                <a
                  href="mailto:Zbyszior52@wp.pl"
                  className="hover:text-white transition-colors"
                >
                  Zbyszior52@wp.pl
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone w-4 mr-3 text-watercolor-sage"></i>
                <a
                  href="tel:600252658"
                  className="hover:text-white transition-colors"
                >
                  600 252 658
                </a>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt w-4 mr-3 mt-0.5 text-watercolor-umber"></i>
                <span>
                  {t("contact.artistInfo.location.city")}
                  <br />
                  {t("contact.artistInfo.location.country")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              {`${copyrightDate} ${t("footer.copyright")}`}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <button
                onClick={onAnnouncementClick}
                className="text-gray-300 hover:text-white text-sm transition-colors flex items-center"
                aria-label={t("footer.announcementAriaLabel")}
              >
                <i className="fas fa-bullhorn mr-2"></i>
                <span>{t("footer.announcement")}</span>
              </button>
              <Link
                href="/privacy-policy"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/cookies-policy"
                className="text-gray-300 hover:text-white text-sm transition-colors"
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
