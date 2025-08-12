import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface TimelineEvent {
  year: string;
  titleKey: string;
  descriptionKey: string;
  color: string;
  side: "left" | "right";
}

export default function Timeline() {
  const { t } = useTranslation();

  const events: TimelineEvent[] = [
    {
      year: "1952",
      titleKey: "timeline.event1.title",
      descriptionKey: "timeline.event1.description",
      color: "watercolor-ochre-accent",
      side: "left",
    },
    {
      year: "1968",
      titleKey: "timeline.event2.title",
      descriptionKey: "timeline.event2.description",
      color: "watercolor-sage-accent",
      side: "right",
    },
    {
      year: "1973-75",
      titleKey: "timeline.event3.title",
      descriptionKey: "timeline.event3.description",
      color: "watercolor-umber-accent",
      side: "left",
    },
    {
      year: "1987",
      titleKey: "timeline.event4.title",
      descriptionKey: "timeline.event4.description",
      color: "watercolor-blue-accent",
      side: "right",
    },
    {
      year: "1995",
      titleKey: "timeline.event5.title",
      descriptionKey: "timeline.event5.description",
      color: "watercolor-ochre-accent",
      side: "left",
    },
    {
      year: "2024",
      titleKey: "timeline.event6.title",
      descriptionKey: "timeline.event6.description",
      color: "gradient",
      side: "right",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-watercolor-ochre-accent to-watercolor-umber-accent rounded-full"></div>

      <div className="space-y-8 sm:space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex items-start ${
              event.side === "left"
                ? "md:justify-between justify-start"
                : "md:justify-between md:flex-row-reverse justify-start"
            }`}
          >
            <div
              className={`w-full md:w-5/12 ${
                event.side === "left" ? "md:text-right md:pr-8" : "md:pl-8"
              } pl-12 md:pl-0`}
            >
              <div
                className={`bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg watercolor-hover border ${
                  event.color === "gradient"
                    ? "bg-gradient-to-br from-watercolor-ochre to-watercolor-umber border-white/50"
                    : `border-${event.color}/20 dark:border-gray-700`
                }`}
                data-testid={`timeline-event-${event.year}`}
              >
                <h3 className="font-poppins font-semibold text-lg sm:text-xl text-gray-800 dark:text-white mb-2">
                  {t(event.titleKey)}
                </h3>
                <p
                  className={`font-medium mb-2 text-lg ${
                    event.color === "gradient"
                      ? "text-gray-700"
                      : `text-${event.color}`
                  }`}
                >
                  {event.year}
                </p>
                <p
                  className={`${
                    event.color === "gradient"
                      ? "text-gray-700"
                      : "text-gray-600 dark:text-gray-300"
                  } text-sm sm:text-base leading-relaxed`}
                >
                  {t(event.descriptionKey)}
                </p>
              </div>
            </div>

            <div className="absolute left-2.5 md:relative md:left-0 md:w-2/12 md:flex md:justify-center w-auto flex justify-center mt-2">
              <div
                className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg ${
                  event.color === "gradient"
                    ? "bg-gradient-to-r from-watercolor-ochre-accent to-watercolor-umber-accent animate-watercolor"
                    : `bg-${event.color}`
                }`}
              ></div>
            </div>

            <div className="hidden md:block md:w-5/12"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
