
import React from "react";
import { Outlet } from "react-router-dom";

import Searchbar from "components/Searchbar";


export default function Layout({updateSearchQuery, updateSearchParams, resetState}) {

    return <>
        <Searchbar updateSearchQuery={updateSearchQuery} updateSearchParams={updateSearchParams} resetState={resetState}/>
        <Outlet/>
    </>
}