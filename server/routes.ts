import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// ZMIANA: Zmieniono nazwę na poprawną, która istnieje w pliku schema.ts
import { contactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body using Zod schema
      // ZMIANA: Użyto poprawnej nazwy schematu
      const validatedData = contactMessageSchema.parse(req.body);

      // Create contact message using storage interface
      const contactMessage = await storage.createContactMessage(validatedData);

      res.status(201).json({
        success: true,
        message: "Contact message sent successfully",
        id: contactMessage.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        console.error("Error creating contact message:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  // Get all contact messages (for potential admin interface)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({
        success: true,
        data: messages,
      });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Get specific contact message by ID
  app.get("/api/contact-messages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const message = await storage.getContactMessage(id);

      if (!message) {
        res.status(404).json({
          success: false,
          message: "Contact message not found",
        });
        return;
      }

      res.json({
        success: true,
        data: message,
      });
    } catch (error) {
      console.error("Error fetching contact message:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Temporary placeholder endpoint for artwork images
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;

    // Generate a simple SVG placeholder with watercolor gradient
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="watercolor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#E8F4FD;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#F0E6FF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFE6D9;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#watercolor)"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle" dominant-baseline="middle">
          Zbigniew J. Rutkowski
        </text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="12" fill="#888" text-anchor="middle" dominant-baseline="middle">
          Akwarela ${width}×${height}
        </text>
      </svg>
    `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
    res.send(svg);
  });

  const httpServer = createServer(app);

  return httpServer;
}
