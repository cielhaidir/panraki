// Drawer.jsx
import React, { useState } from "react";
import Header from "../../Components/Pandraki/Header.jsx";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";


function Drawer({ auth, children }) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (index) => {
        setSelectedIndex(index); // Update selectedIndex state when clicked
    };

    const dataArray = [
        { icon: <MdSpaceDashboard />,label: "Dashboard", to: "/dashboard" },
        { icon: <FaHistory/>,label: "Riwayat Laporan", to: "/riwayat-laporan" },
        { icon: <IoMdSettings/>,label: "Settings", to: "/settings" },
        // Add more items as needed
      ];

    return (
        <div className="drawer lg:drawer-open bg-slate-100">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side z-20">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div
                    className="lg:ms-5 bg-slate-700 mt-5  rounded-2xl"
                    style={{ minHeight: "calc(100vh - 2.5rem)" }}
                >
                    <div className="flex flex-col items-center justify-center">
                        <img
                            className="mt-4"
                            src="/images/panraki.png"
                            alt="Description of the image"
                            width="200px"
                        />
                    </div>
                    <hr
                        className="mt-2 mx-8"
                        style={{
                            borderColor: "white",
                            height: "2px",
                        }}
                    />
                    <ul className="menu p-4 w-64 min-h-full text-white text-lg ">
                        {dataArray.map((item, index) => (
                            <li
                                key={index}
                                className={`hover:bg-slate-100  hover:text-black  rounded-md ${selectedIndex === index ? "bg-slate-100 text-xl text-black" : ""}`}
                      
                                onClick={() => handleListItemClick(index)}
                            >
                                <Link className="focus:text-black" to={item.to}>{item.icon}{item.label}</Link>{" "}
                                {/* Assuming your data structure */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="drawer-content flex flex-col z-10 bg-slate-100 h-full min-h-screen">
                {children[0]}

                <div className=" flex justify-start flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 px-4 lg:ms-3 mt-2">
                    {React.Children.map(children, (child, index) => {
                        return index !== 0 ? child : null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Drawer;
