import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

interface MainLayoutPorps {
    children: React.ReactNode
}
const MainLayout = (props: MainLayoutPorps) => {
    return (
        <>
            <NavBar></NavBar>
            <div>{props.children}</div>
            <Footer></Footer>
        </>
    )
}

export default MainLayout;