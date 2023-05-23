import routerPush from "@/utils/routerPush";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";

const sortOptions = [
    { label: 'پر بازدید ترین', id: 'most' },
    { label: 'محبوب ترین', id: 'popular' },
    { label: 'جدید ترین', id: 'newest' },
]

const SortBar = () => {
    const router = useRouter()

    const [selectedSort, setSelectedSort] = useState('most')
    const sortHandler = (id) => {
        setSelectedSort(id)
        router.query.sort = id
        routerPush(router)
    }

    return (
        <div className="bg-white rounded-3xl px-4">
            <div className="flex items-center gap-x-2">
                <AdjustmentsHorizontalIcon className='h-6 w-6' />
                <span className='text-lg ml-4'>مرتب سازی:</span>
                <ul className='flex items-center gap-x-4'>
                    {sortOptions.map(sort => (
                        <li key={sort.id}>
                            <button
                                onClick={() => sortHandler(sort.id)}
                                className={`transition-all duration-300 ${selectedSort === sort.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'} py-5`}>
                                {sort.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SortBar;