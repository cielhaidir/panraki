import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center  sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                <img
                            className=""
                            src="/images/pnup.png"
                            alt="Description of the image"
                            width="100px"
                        />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-2xl">
                {children}
            </div>
        </div>
    );
}
