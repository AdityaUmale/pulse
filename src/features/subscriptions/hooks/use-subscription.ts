import { authClient } from "@/lib/auth-client"
import { protectedProcedure } from "@/trpc/init";
import { polarClient } from "@/lib/polar";
import { useQuery } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";


export const useSubscription = () => {
    return useQuery({
        queryKey: ["subscription"],
        queryFn: async () => {
            const { data } = await authClient.customer.state();
            return data;
        }
    })
}

export const useHasActiveSubscription = () => {
    const { data: customerState, isLoading, ...rest } = useSubscription();

    const hasActiveSubscription = customerState?.activeSubscriptions && customerState.activeSubscriptions.length > 0;
    return {
        isLoading,
        hasActiveSubscription,
        subscription: customerState?.activeSubscriptions?.[0],
        ...rest
    }
}

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