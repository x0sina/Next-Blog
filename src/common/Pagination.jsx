import routerPush from "@/utils/routerPush";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";

const Paginate = ({ count, page }) => {
    const router = useRouter()

    const pageHandler = (e, page) => {
        router.query.page = page
        routerPush(router)
    }

    return (
        <div dir="ltr" className="col-span-6 text-3xl font-bold flex flex-col items-center">
            {count > 1 && (
                <Pagination onChange={pageHandler} page={page} color="primary" count={count} />
            )}
        </div>
    );
}

export default Paginate;