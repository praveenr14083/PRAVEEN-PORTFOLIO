'use client'

import { usePortfolio } from '@/hooks/usePortfolio'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CERTIFICATES_DATA } from '../data/certificates'

export function CertificateSection() {
  const { portfolioData } = usePortfolio()
  const { certificates: fetchedCertificates } = portfolioData
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  )

  const certificates =
    fetchedCertificates && fetchedCertificates.length > 0 ? fetchedCertificates : CERTIFICATES_DATA

  // Duplicate the items to guarantee enough content for infinite scrolling
  const displayCertificates = [...certificates, ...certificates, ...certificates]

  return (
    <section
      id="certificates"
      className="section-flexible w-full bg-background overflow-hidden"
    >
      <div className="w-full flex flex-col items-center gap-12">
        {/* Carousel Container */}
        <div data-aos="fade-up" className="w-full py-10 relative">
          {/* Smoke Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
              {displayCertificates.map((cert, index) => (
                <div
                  key={`${cert._id}-${index}`}
                  className="flex-[0_0_auto] min-w-0 group relative mr-4 md:mr-8"
                  onClick={() => setSelectedImage(cert.image.url)}
                >
                  <div className="w-[300px] md:w-[400px] aspect-[1.4/1] rounded-xl overflow-hidden relative">
                    <img
                      src={cert.image.url}
                      alt={cert.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <p className="text-white font-bold text-lg">{cert.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Certificate Full View"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
