import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type SchemaType = "website" | "artist" | "artwork" | "breadcrumbs";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  schema?: {
    type: SchemaType;
    data?: any;
  };
  isHomePage?: boolean;
}

const siteUrl = "https://zbigniew-rutkowski.netlify.app";
const siteName = "Atlas Twórczości Zbigniewa Rutkowskiego";
const defaultImage = `${siteUrl}/11.jpg`;
const logoUrl = `${siteUrl}/android-chrome-512x512.png`;
const facebookProfileUrl = "https://www.facebook.com/zbigniewjan.rutkowski";

export default function SEO({
  title,
  description,
  image = defaultImage,
  path,
  schema,
  isHomePage = false,
}: SEOProps) {
  const { i18n, t } = useTranslation();

  const defaultTitle = t("seo.defaultTitle");
  const defaultDescription = t("seo.defaultDescription");

  const pageTitle = title
    ? isHomePage
      ? title
      : `${title} - ${siteName}`
    : defaultTitle;
  const pageDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${path || window.location.pathname}`;

  // Poprawka: Gwarantuje pełny URL obrazka
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const getOgLocale = () => {
    switch (i18n.language) {
      case "pl":
        return "pl_PL";
      case "en":
        return "en_US";
      case "fr":
        return "fr_FR";
      default:
        return "pl_PL";
    }
  };

  const generateSchema = () => {
    if (!schema) return null;

    let schemaData: object | null = null;
    const { type, data } = schema;

    switch (type) {
      case "website":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };
        break;
      case "artist":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zbigniew Jan Rutkowski",
          url: canonicalUrl,
          jobTitle: "Malarz, Akwarelista",
          nationality: "Polska",
          birthPlace: "Radom",
          sameAs: [facebookProfileUrl],
        };
        break;
      case "artwork":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Painting",
          name: data.title,
          description: data.description,
          image: fullImageUrl, // Użycie pełnego URL
          url: canonicalUrl,
          author: {
            "@type": "Person",
            name: "Zbigniew Jan Rutkowski",
            url: `${siteUrl}/about`,
          },
          dateCreated: data.year,
          artform: data.technique,
          material: data.substrate,
          height: `${data.dimensions.split("x")[0].trim()} cm`,
          width: `${data.dimensions.split("x")[1].trim()} cm`,
        };
        break;
      case "breadcrumbs":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${siteUrl}${item.path}`,
          })),
        };
        break;
    }

    if (!schemaData) return null;

    return (
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    );
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={getOgLocale()} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      <link rel="canonical" href={canonicalUrl} />
      {generateSchema()}
    </Helmet>
  );
}
