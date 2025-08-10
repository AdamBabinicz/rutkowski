import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, alt }: ImageModalProps) {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = alt;
    link.click();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          data-testid="image-modal"
        >
          <div className="relative max-w-5xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:text-gray-300 hover:bg-white/10"
              onClick={onClose}
              data-testid="modal-close"
            >
              <X className="h-6 w-6" />
            </Button>

            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={imageUrl}
              alt={alt}
              className="max-w-full max-h-full rounded-lg transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel / 100})` }}
              data-testid="modal-image"
            />

            {/* Image Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-4 py-2 flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 hover:bg-white/10"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
                data-testid="zoom-out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-white text-sm" data-testid="zoom-level">
                {zoomLevel}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 hover:bg-white/10"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 200}
                data-testid="zoom-in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="w-px h-4 bg-gray-500"></div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 hover:bg-white/10"
                onClick={handleDownload}
                data-testid="download-image"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
