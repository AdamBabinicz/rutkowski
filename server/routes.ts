import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Create contact message using storage interface
      const contactMessage = await storage.createContactMessage(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Contact message sent successfully",
        id: contactMessage.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error creating contact message:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
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
        data: messages
      });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
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
          message: "Contact message not found"
        });
        return;
      }
      
      res.json({
        success: true,
        data: message
      });
    } catch (error) {
      console.error("Error fetching contact message:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
