import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { TFunction } from "i18next";

const getContactSchema = (t: TFunction) =>
  z.object({
    firstName: z.string().min(2, t("validation.firstNameMin")),
    lastName: z.string().min(2, t("validation.lastNameMin")),
    email: z.string().email(t("validation.emailInvalid")),
    subject: z.string().min(1, t("validation.subjectRequired")),
    message: z.string().min(10, t("validation.messageMin")),
    privacy: z
      .boolean()
      .refine((val) => val === true, t("validation.privacyRequired")),
  });

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = getContactSchema(t);
  type ContactFormData = z.infer<typeof contactSchema>;

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
        title: t("contact.form.successTitle"),
        description: t("contact.form.success"),
      });
      form.reset();
    } catch (error) {
      toast({
        title: t("contact.form.errorTitle"),
        description: t("contact.form.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={t("contact.title")}
        description={t("contact.description")}
        path="/contact"
      />
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-poppins font-bold text-4xl md:text-6xl text-gray-800 dark:text-white mb-6">
                {t("contact.title")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t("contact.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
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
                            <Input
                              type="email"
                              {...field}
                              data-testid="input-email"
                            />
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-subject">
                                <SelectValue
                                  placeholder={t("contact.form.selectSubject")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="purchase">
                                {t("contact.subjects.purchase")}
                              </SelectItem>
                              <SelectItem value="commission">
                                {t("contact.subjects.commission")}
                              </SelectItem>
                              <SelectItem value="exhibition">
                                {t("contact.subjects.exhibition")}
                              </SelectItem>
                              <SelectItem value="general">
                                {t("contact.subjects.general")}
                              </SelectItem>
                              <SelectItem value="press">
                                {t("contact.subjects.press")}
                              </SelectItem>
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
                              <a
                                href="/privacy-policy"
                                className="text-watercolor-lavender-deep hover:underline"
                              >
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
                      className="w-full bg-gradient-to-r from-watercolor-ochre-accent to-watercolor-umber-accent text-white dark:text-watercolor-charcoal py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg"
                      data-testid="submit-contact-form"
                    >
                      <i className="fas fa-paper-plane mr-2"></i>
                      {isSubmitting ? t("loading") : t("contact.form.submit")}
                    </Button>
                  </form>
                </Form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                  <img
                    src="/2.avif"
                    alt={t("contact.artistInfo.alt")}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-watercolor-lavender-deep"
                  />
                  <h3 className="font-poppins font-semibold text-xl text-center text-gray-800 dark:text-white mb-2">
                    {t("contact.artistInfo.name")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    {t("contact.artistInfo.bio")}
                  </p>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                  <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-4">
                    {t("contact.artistInfo.contactDetails")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-watercolor-sage rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-envelope text-gray-700"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t("contact.info.email")}
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          Zbyszior52@wp.pl
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-watercolor-blue rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-phone text-gray-700"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t("contact.info.phone")}
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          600 252 658
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-watercolor-peach rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-map-marker-alt text-gray-700"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t("contact.info.atelier")}
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {t("contact.artistInfo.location.city")}
                          <br />
                          {t("contact.artistInfo.location.country")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-watercolor-lavender rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-clock text-gray-700"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t("contact.info.hours")}
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {t("contact.artistInfo.hours.days")}
                          <br />
                          {t("contact.artistInfo.hours.weekend")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                  <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-4">
                    {t("contact.artistInfo.socialsTitle")}
                  </h3>
                  {/* <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-gradient-to-br from-watercolor-lavender-deep to-watercolor-peach-deep rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 watercolor-hover"
                      data-testid="social-instagram-contact"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/zbigniewjan.rutkowski"
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
                  </div> */}
                  <div className="flex space-x-4">
                    {/* Link do Facebooka */}
                    <a
                      href="https://www.facebook.com/zbigniewjan.rutkowski"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-br from-watercolor-blue-deep to-watercolor-sage-deep rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 watercolor-hover"
                      data-testid="social-facebook-contact"
                      aria-label="Facebook"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                    {/* Link do Messengera */}
                    <a
                      href="https://m.me/zbigniewjan.rutkowski"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 watercolor-hover"
                      data-testid="social-messenger-contact"
                      aria-label="Messenger"
                    >
                      <i className="fab fa-facebook-messenger"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
