import React from "react";
import { EdExCard } from "../components/EdExCard";
import { EDUCATION, EXPERIENCE } from "../data/edex";
import { BookSearch, CaseLower, Laptop } from "lucide-react";

export function MyJourneySection() {
  return (
    <section id="journey" className="section-fullscreen bg-background">
      <div className="w-full flex flex-col items-center justify-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl lg:text-4xl text-center font-doto font-bold uppercase">
            My Journey
          </h1>
          <p className="max-w-[600px] text-md text-muted-foreground text-center">
            A timeline of innovation, growth, and professional milestones
            defining my career path.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="order-2 md:order-1 flex flex-col gap-8">
            {/* Experience */}
            <div className="space-y-2">
              <div className="flex items-center gap-5">
                <div className="bg-primary-color p-2 rounded text-white">
                  <Laptop />
                </div>
                <h1 className="font-semibold text-2xl">Experience</h1>
              </div>
            </div>

            <div>
              {EXPERIENCE.map((exp) => (
                <EdExCard key={exp.id} data={exp} />
              ))}
            </div>

            {/* Education */}
            <div className="space-y-2">
              <div className="flex items-center gap-5">
                <div className="bg-primary-color p-2 rounded text-white">
                  <BookSearch />
                </div>
                <h1 className="font-semibold text-2xl">Education</h1>
              </div>
            </div>
            <div>
              {EDUCATION.map((edu) => (
                <EdExCard key={edu.id} data={edu} />
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 flex flex-col items-center lg:sticky lg:top-30 lg:self-start">
            <img
              className="w-96"
              src="/images/my-journey.png"
              alt="Praveen"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
