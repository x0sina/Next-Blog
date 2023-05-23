import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth, useAuthActions } from "src/context/AuthContext";

const Header = () => {
    const { user, loading } = useAuth()
    const dispatch = useAuthActions()

    return (
        <header className="bg-gray-50 border-b border-gray-200 shadow sticky top-0 z-10 mb-4">
            <div className={`transition-all duration-500 ${loading ? 'opacity-0' : 'opacity-100'
                } max-w-screen-xl px-6 mx-auto`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link className="py-3.5 inline-block ml-12" href='/'>
                            <img className="h-8 w-8" src="/favicon.ico" alt="" />
                        </Link>
                        <nav>
                            <ul className="flex items-center gap-x-8">
                                <li>
                                    <Link className="py-3.5 font-semibold transition-all duration-150 hover:text-blue-500"
                                        href='/'>
                                        خانه
                                    </Link>
                                </li>
                                <li>
                                    <Link className="py-3.5 font-semibold transition-all duration-150 hover:text-blue-500"
                                        href='/blogs'>
                                        بلاگ ها
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <ul className="flex items-center gap-x-4">
                            {!user ? (
                                <>
                                    <li>
                                        <Link className="py-2 font-semibold bg-blue-200 px-4 hover:text-blue-700 rounded-full transition-all duration-200 hover:px-10"
                                            href='/auth/signup'>
                                            ثبت نام
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="py-2 bg-violet-200 px-4 hover:text-blue-700 rounded-full font-semibold transition-all duration-200 hover:px-10"
                                            href='/auth/signin'>
                                            ورود
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link className="py-2 block font-semibold transition-all duration-150" href='/blogs'>
                                            <UserCircleIcon className="stroke-gray-600 h-8 w-8" />
                                        </Link>
                                    </li>
                                    <button
                                        onClick={() => dispatch({ type: 'SIGNOUT' })}
                                        className="px-4 py-1.5 bg-red-400">
                                        خروج
                                    </button>
                                    <span>{user.name}</span>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;