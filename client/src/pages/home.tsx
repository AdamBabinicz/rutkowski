// Plik: home.tsx (WERSJA DIAGNOSTYCZNA)

import SEO from "@/components/SEO";

// UWAGA: Hardkodujemy dane, aby wykluczyć błędy z importu JSON lub Zod
const featuredArtworkForSeo = {
  imageUrl: "/attached_assets/1.avif",
  ogImageUrl: "/attached_assets/1.jpg",
};

export default function Home() {
  return (
    <>
      <SEO
        title="Zbigniew Rutkowski | Malarstwo i Akwarela - Oficjalna Galeria"
        description="Oficjalna strona poświęcona życiu i twórczości radomskiego malarza Zbigniewa Rutkowskiego."
        isHomePage={true}
        image={
          featuredArtworkForSeo.ogImageUrl || featuredArtworkForSeo.imageUrl
        }
        path="/"
        schema={{ type: "website" }}
      />
      <main>
        <h1>Strona Główna - Test Renderowania</h1>
        <p>To jest testowa zawartość strony.</p>
      </main>
    </>
  );
}
