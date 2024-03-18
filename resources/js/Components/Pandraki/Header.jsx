
import React, { useState } from 'react';

import Dropdown from '@/Components/Dropdown';

export default function Header({user}) {

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
        window.addEventListener('scroll', handleScroll);
        // Remove event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


    const handleLogout = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        const form = event.target.closest('form');
        form.submit();
      };

    return (
        <header className={scrolled ? `sticky z-50 top-0 py-2 rounded-xl glassmor text-black` : `sticky z-50 shadow-md top-0 py-2 text-black bg-slate-100 `}>
   
            <div className="container">
                <nav className="navbar ">
                    
                    <div className="flex-1">
                        <a  className="btn btn-ghost text-xl" href='/'>Panraki</a>
                    </div>
                    <div className="flex-none">
                    <div className="dropdown dropdown-end">
                    

                        <button className={`btn btn-square btn-ghost `}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-5 h-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                ></path>
                            </svg>
                            
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 text-black bg-slate-100"
                        >
                         
                            {user ? (
                                <>
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                            <li>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                            </li>
                            </>
                            ):(
                                <li>
                                <a href="/login">
                                    Login
                                </a>
                            </li>
                            
                            )}
                        </ul>
                  
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
