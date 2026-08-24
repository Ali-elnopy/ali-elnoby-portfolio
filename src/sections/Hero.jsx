import React from "react";
import gsap from "gsap";
import { words } from "../constants";
import Button from "../components/Button";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../components/AnimatedCounter";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
    );
    gsap.fromTo(
      ".image",
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      },
    );
  });
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>
      <div className="flex flex-row">
        {/* {Left: Hero Content} */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'am Ali, a developer based in Croatia with a passion for
              code.
            </p>

            <Button
              id="button"
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
            />
          </div>
        </header>
        {/* {Right: Photo} */}
        <div className="flex items-center justify-center w-full h-screen rounded-full mx-20 z-20">
          <img
            src="/images/myPhoto.jpg"
            alt="my photo"
            className="image w-100 h-120 object-cover rounded-2xl"
          />
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
