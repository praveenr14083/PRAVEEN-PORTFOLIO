"use client";
import { ButtonRounded } from "@/components/common/ButtonRounded";
import Typewriter from "typewriter-effect";
import React from "react";
import { cn } from "@/lib/utils";
import { Link as ScrollLink } from "react-scroll";

export function HeroSection() {
  return (
    <section
      id="hero-section"
      className="section-fullscreen flex items-center relative overflow-hidden"
    >
      {/* Gradient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute -z-10 inset-0",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        <div className="-z-10 pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-black"></div>
        <div className="-z-10 hidden lg:block absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-primary-color/10 rounded-full blur-3xl"></div>
        <div className="hidden lg:block absolute top-0 -right-32 w-[300px] h-[300px] bg-primary-color/10 rounded-full blur-3xl"></div>
        <div className="hidden lg:block absolute top-0 -right-80 w-[500px] h-[500px] bg-primary-color/5 rounded-full blur-3xl"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center md:items-start justify-center gap-8 order-2 lg:order-1">
          <div className="flex flex-col items-center lg:items-start gap-6">
            <h1 className="text-md lg:text-lg">{`Hi, I'm`}</h1>
            <h1 className="text-2xl lg:text-4xl text-center lg:text-start font-doto font-bold uppercase">
              <Typewriter
                options={{
                  strings: [
                    "<span style='color:#00A3E0'>Praveen</span>",
                    "a <span style='color:#00A3E0'>Web Developer</span>",
                    "a <span style='color:#00A3E0'>Fullstack Developer</span>",
                    "a <span style='color:#00A3E0'>Frontend Developer</span>",
                    "a <span style='color:#00A3E0'>UI Developer</span>",
                    "a <span style='color:#00A3E0'>Designer</span>",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="text-md text-muted-foreground text-center lg:text-justify ">
              I am Praveen R, a passionate Full-Stack Developer, Web & UI
              Designer with strong attention to detail. I specialize in building
              complete web applications from frontend to backend. I blend
              creativity with technical expertise to design intuitive interfaces
              and develop scalable, modern solutions. I'm dedicated to crafting
              responsive, user-friendly digital experiences across the entire
              development stack.
            </p>
          </div>
          <div className="w-full flex items-center justify-center lg:justify-start gap-4">
            <ScrollLink
              to="contact" // Make sure this matches your section ID
              smooth={true}
              duration={500}
              offset={-70}
            >
              <ButtonRounded>Contact Me</ButtonRounded>
            </ScrollLink>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2 p-10">
          <img className="w-96" src="/images/praveen.png" alt="" />
        </div>
      </div>
    </section>
  );
}
