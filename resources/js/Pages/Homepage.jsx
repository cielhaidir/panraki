import { Head, Link } from "@inertiajs/react";
import React from "react";

import Header from "../Components/Pandraki/Header.jsx";
import Hero from "@/Components/Pandraki/Hero.jsx";
import Unit from "@/Components/Pandraki/Unit.jsx";


export default function Homepage({auth}) {

    return (    
        <div className="bg-slate-100">
            <Head title="Home" />
            <Header user={auth.user}  batas='ps-5 pe-5 mt-6 top-6 bg-white'/>
            <Hero />
            <Unit />
            
        </div>
    );
}
