import React from "react";
import Displaycards from "./Displaycards";
import UICharts from "./UICharts";

function Home(){
    return(
        <>
        <div className="content-wrapper overflow-hidden">

        <div className="mt-5 me-2 ms-2">
        <Displaycards/>
        <UICharts/>
        </div>
        </div>

     </>
    )
}

export default Home;