import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {

    await requireAuth();
    return (
        <p>execution id page</p>
    )
}

export default Page;