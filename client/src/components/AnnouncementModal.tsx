import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
export default function AnnouncementModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const announcementShown = sessionStorage.getItem("announcementShown_v1");
    if (!announcementShown) {
      setIsOpen(true);
      sessionStorage.setItem("announcementShown_v1", "true");
    }
  }, []);
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 flex-shrink-0">
            <img
              src="/1.webp"
              alt={t("announcement.imageAlt")}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col">
            <DialogHeader>
              <DialogTitle className="font-poppins text-2xl mb-2 text-gray-800 dark:text-white">
                {t("announcement.title")}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>
              <div className="text-gray-700 dark:text-gray-300 space-y-4 whitespace-pre-wrap leading-relaxed flex-grow">
                <p>{t("announcement.body")}</p>
              </div>
            </DialogDescription>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs italic text-gray-500 dark:text-gray-400">
                {t("announcement.authorLabel")}{" "}
                <a
                  href="https://www.facebook.com/szymon.fotak.wykrota/posts/pfbid0cDd8cmG1T1BxLcoDxuweYJwWjZJ8wftAWtMcizduDuia3ijHU7sLRCFqRmuH49Ywl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {t("announcement.authorName")}
                </a>
                , {t("announcement.sourceLabel")}
              </p>
            </div>
            <div className="mt-4 text-right">
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
