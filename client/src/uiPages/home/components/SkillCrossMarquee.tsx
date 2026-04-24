"use client";
import React from 'react'
import Marquee from "react-fast-marquee";
import { SKILLS_DATA } from '../data/skills';
import { Sparkle } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';

export function SkillCrossMarquee() {
    const { portfolioData } = usePortfolio();
    const { technologies } = portfolioData;

    const marqueeItems = technologies && technologies.length > 0 
        ? technologies 
        : SKILLS_DATA.flatMap((item) => item.skills);

    return (
        <div className="overflow-hidden">
            <div className="relative my-16">

                {/* BACK MARQUEE */}
                <div className="absolute inset-0 skew-4 bg-white text-black py-2">
                    <Marquee speed={40} direction="right" className="h-[2rem]">
                        {marqueeItems.map((skill, index) => {
                            const name = typeof skill === 'string' ? skill : (skill as any).name;
                            return (
                                <div key={index} className="flex items-center">
                                    <h1 className="font-semibold text-md md:text-xl">
                                        {name}
                                    </h1>
                                    <Sparkle className="mx-4 w-4 h-4 md:w-5 md:h-5" />
                                </div>
                            );
                        })}
                    </Marquee>
                </div>

                {/* FRONT MARQUEE */}
                <div className="relative -skew-4 bg-primary-color py-2">
                    <Marquee speed={60} className="h-[2rem]">
                        {marqueeItems.map((skill, index) => {
                            const name = typeof skill === 'string' ? skill : (skill as any).name;
                            return (
                                <div key={index} className="flex items-center">
                                    <h1 className="font-semibold text-md md:text-xl">
                                        {name}
                                    </h1>
                                    <Sparkle className="mx-4 w-4 h-4 md:w-5 md:h-5" />
                                </div>
                            );
                        })}
                    </Marquee>
                </div>

            </div>
        </div>
    )
}
