import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import prisma from "./db";
import { polarClient } from "./polar";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",

  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,

  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "dad6cd33-ba3a-4b89-b417-e7de840e32fa",
              slug: "premium"
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onPayload: async (payload) => {
            console.log("[Polar Webhook] Event received:", payload.type);
            console.log("[Polar Webhook] Payload:", JSON.stringify(payload, null, 2));
          }
        })
      ]
    })
  ],
  trustedOrigins: ["http://localhost:3000"],
});