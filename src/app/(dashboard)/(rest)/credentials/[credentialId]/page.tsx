import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {

    await requireAuth();
    return (
        <p>credential id page</p>
    )
}

export default Page;