import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendEnquiryNotification, sendContactNotification, sendCareerApplicationNotification } from "./mailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      
      // Dispatch email notification to vynextgentechnology@gmail.com
      sendContactNotification(message).catch((mailErr) => {
        console.error("[Mailer Error] Failed to send contact notification:", mailErr);
      });

      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.orders.submit.path, async (req, res) => {
    try {
      const input = api.orders.submit.input.parse(req.body);
      const order = await storage.createWebsiteOrder(input);

      // Dispatch direct email notification to vynextgentechnology@gmail.com
      sendEnquiryNotification(order).catch((mailErr) => {
        console.error("[Mailer Error] Failed to send enquiry notification:", mailErr);
      });

      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.careers.apply.path, async (req, res) => {
    try {
      const input = api.careers.apply.input.parse(req.body);
      const application = await storage.createJobApplication(input);

      // Dispatch direct email notification to vynextgentechnology@gmail.com
      sendCareerApplicationNotification(application).catch((mailErr) => {
        console.error("[Mailer Error] Failed to send career application notification:", mailErr);
      });

      res.status(201).json(application);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Direct File Download Route (Company Brochure / Profile)
  app.get("/api/download/brochure", (_req, res) => {
    const filename = "VY-NextGen-Technologies-Brochure.pdf";
    const samplePdfContent = Buffer.from(
      "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000101 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF\n"
    );

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", samplePdfContent.length.toString());
    res.status(200).send(samplePdfContent);
  });

  return httpServer;
}

