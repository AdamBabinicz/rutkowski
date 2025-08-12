// Plik: @shared/schema.ts

import { z } from "zod";

// --- Schematy Wiadomości Kontaktowych ---
export const insertContactMessageSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane"),
  lastName: z.string().min(1, "Nazwisko jest wymagane"),
  email: z.string().email("Nieprawidłowy adres email"),
  subject: z.string().min(1, "Temat jest wymagany"),
  message: z.string().min(1, "Wiadomość jest wymagana"),
});

export const contactMessageSchema = insertContactMessageSchema.extend({
  id: z.string(),
  createdAt: z.date(),
});

// --- Schematy Dzieł Sztuki ---
export const artworkSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleEn: z.string().optional(),
  titleFr: z.string().optional(),
  year: z.number(),
  imageUrl: z.string(),
  ogImageUrl: z.string().optional(),
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

export const artworksSchema = z.array(artworkSchema);

// --- Schematy Użytkownika (Z POPRAWKAMI) ---

// NOWY SCHEMAT: Definiuje dane potrzebne do STWORZENIA użytkownika
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// ZMODYFIKOWANY SCHEMAT: Definiuje pełnego użytkownika, który jest już w bazie (ma ID)
// Najlepiej zrobić to, rozszerzając schemat 'insert'
export const userSchema = insertUserSchema.extend({
  id: z.string(),
});

// --- Eksporty Typów ---

export type Artwork = z.infer<typeof artworkSchema>;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>; // NOWY TYP
export type User = z.infer<typeof userSchema>;
