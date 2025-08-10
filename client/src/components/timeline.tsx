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
      year: "1952",
      title: "Narodziny w Radomiu",
      description: "Urodził się w Radomiu, mieście z którym pozostaje silnie związany przez całe życie.",
      color: "watercolor-ochre-accent",
      side: "left",
    },
    {
      year: "1968",
      title: "Pierwsza wystawa",
      description: "Debiut artystyczny - pierwsza wystawa jeszcze przed ukończeniem studiów.",
      color: "watercolor-sage-accent",
      side: "right",
    },
    {
      year: "1973-75",
      title: "Dyplom z wyróżnieniem",
      description: "Ukończenie Państwowego Ogniska Plastycznego im. Jacka Malczewskiego w Radomiu z dyplomem 'Za wybitne osiągnięcia w dziale malarstwa'.",
      color: "watercolor-umber-accent",
      side: "left",
    },
    {
      year: "1987",
      title: "Plener w Wieliczce",
      description: "Uczestnictwo w plenerze malarskim w Wieliczce, uhonorowany tytułem 'Honorowego Górnika'.",
      color: "watercolor-blue-accent",
      side: "right",
    },
    {
      year: "1995",
      title: "Droga Krzyżowa",
      description: "Namalowanie 14 stacji Drogi Krzyżowej dla kościoła św. Jadwigi Królowej w Radomiu (technika olejna, według Mehoffera).",
      color: "watercolor-ochre-accent",
      side: "left",
    },
    {
      year: "2024",
      title: "50 lat twórczości",
      description: "Kontynuacja aktywnej pracy twórczej. Dzieła w kolekcjach prywatnych w Polsce, Szwecji, Argentynie, Austrii, Szwajcarii, Kanadzie i USA.",
      color: "gradient",
      side: "right",
    },
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-watercolor-ochre-accent to-watercolor-umber-accent rounded-full"></div>

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
                    ? "bg-gradient-to-br from-watercolor-ochre to-watercolor-umber border-white/50"
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
                    ? "bg-gradient-to-r from-watercolor-ochre-accent to-watercolor-umber-accent animate-watercolor"
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
