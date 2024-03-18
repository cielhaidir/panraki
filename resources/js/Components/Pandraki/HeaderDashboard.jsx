import React, { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { BiSolidLogOut } from "react-icons/bi";
import Dropdown from '@/Components/Dropdown';
export default function HeaderDashboard({ user, button, batas, root, children }) {

    const location = useLocation();

    
    // Define breadcrumbs based on the current location
    const getBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        return pathnames.map((pathname, index) => {
            let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

            if (routeTo === '/settings/editKontak' || routeTo.match(/^\/settings\/editKontak\/\d+$/)) {
                routeTo = '/settings';
            }
            if (routeTo === '/riwayat-laporan/detail-laporan' || routeTo.match(/^\/riwayat-laporan\/detail-laporan\/\d+$/)) {
                routeTo = '/riwayat-laporan';
            }
            const isLast = index === pathnames.length - 1;
            return (
                <li key={index} >
                    <a href={routeTo}>{{routeTo} ? pathname : 'Dashboard'}</a>
                </li>
            );
        });
    };


    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        // Check if the page has been scrolled
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // Remove event listener when the component unmounts
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={
                scrolled
                    ? `sticky z-50 py-2 rounded-xl glassmor ${
                          batas ? batas : ""
                      }`
                    : `sticky z-50  top-0 py-2 rounded-xl ${
                          batas ? batas : ""
                      } `
            }
        >
            <div className="lg:container">
                <nav className="navbar ">
                {children}
                    <div className="flex-1">
                        <div className="text-xs breadcrumbs text-black">
                            
                            <ul className="flex flex-wrap">
                                <li>
                                    <a href="/">
                                    <IoHomeSharp />
                                        Home
                                    </a>
                                </li>
                               {getBreadcrumbs()}
                            </ul>
                        </div>
                    </div>
                    <div className="flex-none">
                        <p className="text-black text-xs lg:text-md">{user.username}</p>
                    
                        <div className="dropdown dropdown-end">
            
                            
                            <Dropdown.Link href={route('logout')} method="post" as="button" className="text-xl">
                            <BiSolidLogOut/>
                                        </Dropdown.Link>
                                        
                            
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
