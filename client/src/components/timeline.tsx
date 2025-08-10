import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  color: string;
  side: "left" | "right";
}

export default function Timeline() {
  const { t } = useTranslation();

  const events: TimelineEvent[] = [
    {
      year: "1985",
      title: t("timeline.firstSteps"),
      description: "Rozpoczęcie nauki malarstwa w prywatnym atelier mistrza Kowalskiego w Krakowie.",
      color: "watercolor-lavender-deep",
      side: "left",
    },
    {
      year: "1992",
      title: t("timeline.firstExhibition"),
      description: "Debiut artystyczny w Galerii Sztuki Współczesnej z kolekcją \"Pejzaże Duszy\".",
      color: "watercolor-sage-deep",
      side: "right",
    },
    {
      year: "2001",
      title: t("timeline.breakthrough"),
      description: "Odkrycie unikalnego stylu łączącego tradycyjne techniki z nowoczesną ekspresją.",
      color: "watercolor-peach-deep",
      side: "left",
    },
    {
      year: "2015",
      title: t("timeline.international"),
      description: "Nagroda Grand Prix na Międzynarodowym Biennale Malarstwa w Paryżu.",
      color: "watercolor-blue-deep",
      side: "right",
    },
    {
      year: "2024",
      title: t("timeline.present"),
      description: "Aktywna twórczość i mentoring młodych artystów w ramach Fundacji Twórczej.",
      color: "gradient",
      side: "left",
    },
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-watercolor-lavender-deep to-watercolor-peach-deep rounded-full"></div>

      {/* Timeline Events */}
      <div className="space-y-16">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex items-center ${
              event.side === "left" ? "justify-between" : "justify-between flex-row-reverse"
            }`}
          >
            <div className={`w-5/12 ${event.side === "left" ? "text-right pr-8" : "pl-8"}`}>
              <div
                className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg watercolor-hover border ${
                  event.color === "gradient"
                    ? "bg-gradient-to-br from-watercolor-lavender to-watercolor-peach border-white/50"
                    : `border-${event.color}/20 dark:border-gray-700`
                }`}
                data-testid={`timeline-event-${event.year}`}
              >
                <h3 className="font-poppins font-semibold text-xl text-gray-800 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p
                  className={`font-medium mb-2 ${
                    event.color === "gradient" ? "text-gray-700" : `text-${event.color}`
                  }`}
                >
                  {event.year}
                </p>
                <p
                  className={`${
                    event.color === "gradient"
                      ? "text-gray-700"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {event.description}
                </p>
              </div>
            </div>
            <div className="w-2/12 flex justify-center">
              <div
                className={`w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg ${
                  event.color === "gradient"
                    ? "bg-gradient-to-r from-watercolor-lavender-deep to-watercolor-peach-deep animate-watercolor"
                    : `bg-${event.color}`
                }`}
              ></div>
            </div>
            <div className="w-5/12"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
