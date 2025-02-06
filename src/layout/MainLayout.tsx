import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

interface MainLayoutPorps {
    children: React.ReactNode
}
const MainLayout = (props: MainLayoutPorps) => {
    return (
        <>
            <Nav></Nav>
            <Header></Header>
            <div>{props.children}</div>
            <Footer></Footer>
        </>
    )
}

export default MainLayout;