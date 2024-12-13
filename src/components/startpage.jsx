import React from "react";
import Header from "./header";
import Menu from "./Menu";
import Home from "./Home";
import Footer from "./footer";
import { Sidebar } from "lucide-react";

function StartPage(){
    return(
        <>
        <Header/>
        <Sidebar/>
        <Home/>
        </>
    )
}

export default StartPage;