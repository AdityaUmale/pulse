
import { protectedProcedure } from "@/trpc/init";
import { polarClient } from "@/lib/polar";
import { TRPCError } from "@trpc/server";

export const premiumProcedure = protectedProcedure.use(
    async ({ ctx, next }) => {
        const customer = await polarClient.customers.getStateExternal({
            externalId: ctx.auth.user.id,
        });

        if (!customer.activeSubscriptions || customer.activeSubscriptions.length === 0) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Premium required",
            });
        };
        return next({ ctx: { ...ctx, customer } })
    }
)
