// Plik: AnnouncementModal.tsx (Wersja ostateczna, prosta i działająca)

import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface AnnouncementModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AnnouncementModal({
  isOpen,
  setIsOpen,
}: AnnouncementModalProps) {
  const { t } = useTranslation();

  return (
    // 1. Wracamy do podstaw. `onOpenChange` jest potrzebny, aby przycisk 'x' i klawisz ESC działały.
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        // 2. NAJWAŻNIEJSZA ZMIANA: Ta linijka zapobiega zamknięciu okna
        //    przy interakcji z banerem ciasteczkowym, który jest "na zewnątrz".
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="w-[90vw] max-w-3xl p-0 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex flex-col sm:flex-row overflow-hidden">
          <div className="w-full sm:w-1/3 flex-shrink-0 h-48 sm:h-auto">
            <img
              src="/4.avif"
              alt={t("announcement.imageAlt")}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="p-6 flex flex-col flex-1 overflow-hidden">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="font-poppins text-2xl mb-2 text-gray-800 dark:text-white">
                {t("announcement.title")}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-grow overflow-y-auto pr-4 space-y-4">
              <DialogDescription asChild>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  <p>{t("announcement.body")}</p>
                </div>
              </DialogDescription>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs italic text-gray-500 dark:text-gray-400">
                  {t("announcement.authorLabel")}{" "}
                  <a
                    href="https://a-g.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:no-underline dark:text-blue-400"
                  >
                    {t("announcement.authorName")}
                  </a>
                  , {t("announcement.sourceLabel")}
                </p>
              </div>
            </div>

            <div className="mt-4 text-right flex-shrink-0">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                {t("announcement.closeButton")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
