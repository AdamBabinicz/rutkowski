import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  alt: string;
  onImageClick: (imageUrl: string) => void;
}

export default function ImageSlider({
  images,
  alt,
  onImageClick,
}: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainImage = images[activeIndex] || images[0];

  return (
    <div className="space-y-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
        <img
          src={mainImage}
          alt={alt}
          className="w-full h-96 object-cover rounded-xl cursor-zoom-in"
          onClick={() => onImageClick(mainImage)}
          data-testid="main-artwork-image"
          loading="lazy"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-6 right-6 bg-black/50 text-white hover:bg-black/70"
          onClick={() => onImageClick(mainImage)}
          data-testid="zoom-button"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div
          className="flex space-x-2 overflow-x-auto pb-2"
          data-testid="thumbnail-navigation"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${alt} - miniatura ${index + 1}`}
              loading="lazy"
              className={`w-16 h-12 object-cover rounded cursor-pointer border-2 transition-colors ${
                index === activeIndex
                  ? "border-watercolor-lavender-deep"
                  : "border-transparent hover:border-watercolor-peach-deep"
              }`}
              onClick={() => setActiveIndex(index)}
              data-testid={`thumbnail-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
