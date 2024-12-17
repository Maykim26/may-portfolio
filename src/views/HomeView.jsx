import React from "react";
import Header from "../components/Header";
import Skip from "../components/Skip";
import Intro from "../components/Intro";
import Skill from "../components/Skill";
import Site from "../components/Site";
import Port from "../components/Port";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Main from "../components/Main";
import About from "../components/About"; // About 컴포넌트로 변경

const HomeView = () => {
    return (
        <>
            <Skip />
            <Header />
            <Main>
                {/* <Intro />
				<About /> */}
                <Skill />
                <Site />
                <Port />
                {/* <Contact /> */}
            </Main>
            <Footer />
        </>
    );
};

export default HomeView;
