"use client"

import Image from "next/image"

export function PartnerMinistriesTicker() {
  // Partner Ministries/Organizations
  const partners = [
    {
      id: 1,
      name: "Department of Science & Technology",
      logo: "/logo/images.png",
    },
    {
      id: 2,
      name: "Ministry of Youth Affairs & Sports",
      logo: "/logo/Ministry_sport.png",
    },
    {
      id: 3,
      name: "Ministry of Education",
      logo: "/logo/download.jpg",
    },
    {
      id: 4,
      name: "Ministry of Skill Development",
      logo: "/logo/MSDE.png",
    },
    {
      id: 5,
      name: "Digital India Initiative",
      logo: "/logo/dig.jpg",
    },
    {
      id: 6,
      name: "Ministry of Culture",
      logo: "/logo/Culture.jpeg",
    },
  ]

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 border-y-2 border-primary/20 py-8">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
      
     
      
     
      {/* Scrolling Content - Double the content for seamless loop */}
      <div className="flex gap-8 animate-scroll-ticker">
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="relative w-12 h-12 bg-white rounded-full p-2 shadow-md border-2 border-gray-200 shrink-0">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain rounded-full p-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                {partner.name}
              </p>
              <div className="w-px h-6 bg-gray-300" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-ticker {
          animation: scroll-ticker 20s linear infinite;
        }

        .animate-scroll-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
