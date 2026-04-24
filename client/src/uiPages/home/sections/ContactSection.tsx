import React from "react";
import { ContactForm } from "../components/ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CONTACT_INFO } from "@/utils/contact.const";

export function ContactSection() {
  return (
    <section id="contact" className="section-fullscreen bg-background">
      <div className="w-full flex flex-col items-center justify-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl lg:text-4xl text-center font-doto font-bold uppercase">
            Contact Me
          </h1>
          <p className="max-w-[600px] text-md text-muted-foreground text-center">
            Ready to build something properly? Let's turn your vision into
            reality.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5 flex flex-col items-center lg:sticky lg:top-30 lg:self-start">
            <img className="w-96" src="/images/contact.png" alt="Praveen" />
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
        <div className="w-full">
          <Card className="rounded bg-foreground/4 backdrop-blur-2xl">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CONTACT_INFO.map((item) => (
                  <a
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="p-3 border border-border rounded">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-primary-color text-white">
                            <item.icon className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="font-semibold">{item.label}</p>
                            {item.value && (
                              <p className="text-xs text-muted-foreground">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
