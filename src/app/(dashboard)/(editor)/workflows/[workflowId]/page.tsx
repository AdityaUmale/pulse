import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {

    await requireAuth();
    return (
        <p>workflow id page</p>
    )
}

export default Page;