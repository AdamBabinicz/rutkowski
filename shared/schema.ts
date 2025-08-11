import { z } from "zod";

export const artworkSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleEn: z.string().optional(),
  titleFr: z.string().optional(),
  year: z.number(),
  imageUrl: z.string(),
  imageUrls: z.array(z.string()).optional(),
  dimensions: z.string(),
  technique: z.string(),
  substrate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  dominantColor: z.string().optional(),
  description: z.string(),
  descriptionEn: z.string().optional(),
  descriptionFr: z.string().optional(),
  story: z.string().optional(),
  storyEn: z.string().optional(),
  storyFr: z.string().optional(),
  available: z.number().transform((val) => val === 1),
  price: z.number().optional(),
});

// Dodaj ten eksport
export const artworksSchema = z.array(artworkSchema);

export const contactMessageSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane"),
  lastName: z.string().min(1, "Nazwisko jest wymagane"),
  email: z.string().email("Nieprawidłowy adres email"),
  subject: z.string().min(1, "Temat jest wymagany"),
  message: z.string().min(1, "Wiadomość jest wymagana"),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export type Artwork = z.infer<typeof artworkSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type User = z.infer<typeof userSchema>;
