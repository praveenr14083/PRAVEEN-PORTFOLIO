import React from 'react'
import Marquee from "react-fast-marquee";
import { SKILLS_DATA } from '../data/skills';
import { Sparkle } from 'lucide-react';

const allSkills = SKILLS_DATA.flatMap((item) => item.skills);


export function SkillCrossMarquee() {
    return (
        <div className="overflow-hidden">
            <div className="relative my-16">

                {/* BACK MARQUEE */}
                <div className="absolute inset-0 skew-4 bg-white text-black py-2">
                    <Marquee speed={40} direction="right" className="h-[2rem]">
                        {allSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                                <h1 className="font-semibold text-md md:text-xl">
                                    {skill.name}
                                </h1>
                                <Sparkle className="mx-4 w-4 h-4 md:w-5 md:h-5" />
                            </div>
                        ))}
                    </Marquee>
                </div>

                {/* FRONT MARQUEE */}
                <div className="relative -skew-4 bg-primary-color py-2">
                    <Marquee speed={60} className="h-[2rem]">
                        {allSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                                <h1 className="font-semibold text-md md:text-xl">
                                    {skill.name}
                                </h1>
                                <Sparkle className="mx-4 w-4 h-4 md:w-5 md:h-5" />
                            </div>
                        ))}
                    </Marquee>
                </div>

            </div>
        </div>

    )
}
