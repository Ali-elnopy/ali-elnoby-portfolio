import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import GithubHeatmap from "./components/GithubHeatmap";
import ReactLenis from "lenis/react";

const App = () => {
  return (
    <ReactLenis root>
        <Navbar/>
        <Hero/>
        <GithubHeatmap/>
        <ShowcaseSection/>
        <LogoShowcase/>
        <FeatureCards/>
        <Experience/>
        {/* <TechStack/> */}
        {/* <Testimonials/> */}
        <Contact/>
        <Footer/>
    </ReactLenis>
  )
}

export default App