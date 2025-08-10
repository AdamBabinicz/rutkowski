import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  firstName: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  lastName: z.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  email: z.string().email("Nieprawidłowy adres email"),
  subject: z.string().min(1, "Wybierz temat wiadomości"),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
  privacy: z.boolean().refine(val => val === true, "Musisz zaakceptować politykę prywatności"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Sukces!",
        description: t("contact.form.success"),
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Błąd",
        description: t("contact.form.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("contact.title")} - Atlas Twórczości Rutkowskiego</title>
        <meta name="description" content={t("contact.description")} />
      </Helmet>

      <section className="pt-20 py-20 px-4 bg-gradient-to-br from-watercolor-blue via-background to-watercolor-lavender dark:from-watercolor-charcoal-light dark:via-gray-800 dark:to-watercolor-charcoal">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl"
            >
              <h3 className="font-poppins font-semibold text-2xl text-gray-800 dark:text-white mb-6">
                {t("contact.form.title")}
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.firstName")}</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-firstName" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.lastName")}</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-lastName" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.email")}</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.subject")}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-subject">
                              <SelectValue placeholder={t("contact.form.selectSubject")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="purchase">{t("contact.subjects.purchase")}</SelectItem>
                            <SelectItem value="commission">{t("contact.subjects.commission")}</SelectItem>
                            <SelectItem value="exhibition">{t("contact.subjects.exhibition")}</SelectItem>
                            <SelectItem value="general">{t("contact.subjects.general")}</SelectItem>
                            <SelectItem value="press">{t("contact.subjects.press")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder={t("contact.form.messagePlaceholder")}
                            className="resize-none"
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-privacy"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            {t("contact.form.privacy")}{" "}
                            <a href="#" className="text-watercolor-lavender-deep hover:underline">
                              {t("contact.form.privacyPolicy")}
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-watercolor-lavender-deep to-watercolor-peach-deep text-white py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg"
                    data-testid="submit-contact-form"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    {isSubmitting ? t("loading") : t("contact.form.submit")}
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Artist Photo & Bio */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                  alt="Zdjęcie artysty Rutkowskiego w atelier"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-watercolor-lavender-deep"
                />
                <h3 className="font-poppins font-semibold text-xl text-center text-gray-800 dark:text-white mb-2">
                  Zbigniew Jan Rutkowski
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  Malarz akwarelista, absolwent Państwowego Ogniska Plastycznego w Radomiu. Twórca z niemal 50-letnim doświadczeniem artystycznym.
                </p>
              </div>

              {/* Contact Details */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-4">
                  Dane Kontaktowe
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-watercolor-sage rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-envelope text-gray-700"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("contact.info.email")}</p>
                      <p className="font-medium text-gray-800 dark:text-white">m.rutkowski@artystyka.pl</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-watercolor-blue rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-phone text-gray-700"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("contact.info.phone")}</p>
                      <p className="font-medium text-gray-800 dark:text-white">+48 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-watercolor-peach rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-map-marker-alt text-gray-700"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("contact.info.atelier")}</p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        ul. Artystyczna 15<br />
                        31-000 Kraków
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-watercolor-lavender rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-clock text-gray-700"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("contact.info.hours")}</p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        Wt-Pt: 10:00-18:00<br />
                        So: 10:00-14:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-4">
                  Znajdź mnie też tutaj
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-watercolor-lavender-deep to-watercolor-peach-deep rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 watercolor-hover"
                    data-testid="social-instagram-contact"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-watercolor-blue-deep to-watercolor-sage-deep rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 watercolor-hover"
                    data-testid="social-facebook-contact"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-watercolor-sage-deep to-watercolor-lavender-deep rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 watercolor-hover"
                    data-testid="social-linkedin-contact"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-watercolor-peach-deep to-watercolor-blue-deep rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 watercolor-hover"
                    data-testid="social-youtube-contact"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
