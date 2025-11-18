"use client"
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const resources = [
  {
    id: 1,
    title: "Youth Career Guidelines 2024",
    description: "Comprehensive guide for career planning and professional development",
    category: "Guidelines",
    icon: FileText,
    download: true,
  },
  {
    id: 2,
    title: "Skill Development Handbook",
    description: "Complete resource for skill assessment and training programs",
    category: "Handbook",
    icon: Book,
    download: true,
  },
  {
    id: 3,
    title: "Entrepreneurship Toolkit",
    description: "Tools and templates for starting and managing a business",
    category: "Toolkit",
    icon: FileText,
    download: true,
  },
  {
    id: 4,
    title: "Leadership Development Videos",
    description: "Video series on essential leadership competencies",
    category: "Video",
    icon: Video,
    download: false,
  },
  {
    id: 5,
    title: "Digital Literacy Guide",
    description: "Step-by-step guide to essential digital skills",
    category: "Guide",
    icon: Book,
    download: true,
  },
  {
    id: 6,
    title: "Program Application Templates",
    description: "Ready-to-use templates for program applications",
    category: "Templates",
    icon: FileText,
    download: true,
  },
   {
    id: 7,
    title: "Annual Report 2023",
    description: "A complete report of our activities and impact in 2023.",
    category: "Report",
    icon: Book,
    download: true,
  },
];

export default function ArchivePage() {
  const timelineData = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Chintan Bhawan & Paljor Stadium, Gangtok, Sikkim
          </p>
          <div className="flex gap-4">
            <Image
              src="/placeholder.jpg"
              alt="National Integration Camp 2024"
              width={200}
              height={200}
              className="h-auto w-1/2 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            D K Convention Centre, Delhi Public School, Dera Natung Govt. College & Rajiv Gandhi University, Itanagar, Arunachal Pradesh
          </p>
           <div className="flex gap-4">
            <Image
              src="/placeholder.jpg"
              alt="National Integration Camp 2023"
              width={200}
              height={200}
              className="h-auto w-1/2 rounded-lg object-cover shadow-sm"
            />
             <Image
              src="/vibrant-community-gathering.png"
              alt="National Integration Camp 2023"
              width={200}
              height={200}
              className="h-auto w-1/2 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
          Jawaharlal Nehru Rajkeeya Mahavidyalaya, Port Blair, Andaman & Nicobar Island
        </p>
      ),
    },
    {
      title: "2021",
      content: (
         <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Assam Rifles Public School, Agartala, Tripura
          </p>
      ),
    },
    {
      title: "2020",
      content: (
         <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Atomic Energy Central School, Turamdih, Jamshedpur, Jharkhand
          </p>
      ),
    },
    {
      title: "2019",
      content: (
        <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Atomic Energy Central School Kudankulam, Anuvijay Township, Tamil Nadu
        </p>
      ),
    },
    {
      title: "2018",
      content: (
        <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Atomic Energy Central School, Kakrapar, KAPS Township, Anumala, Tapi, Gujarat
        </p>
      ),
    },
    {
      title: "2017",
      content: (
        <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Army Public School Narangi, Guwahati, Assam
        </p>
      ),
    },
     {
      title: "2016",
      content: (
        <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Assam Rifles Public School, Laitkor, Shillong, Meghalaya
        </p>
      ),
    },
    {
      title: "2015",
      content: (
         <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Navy Children School, Dabolim, Goa
        </p>
      ),
    },
    {
      title: "2014",
      content: (
         <p className="mb-4 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Kendriya Vidyalaya No. 1 and 3, Jaipur, Rajasthan
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
       <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0">
            <Image
                src="/youth-empowerment.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white mb-4">
                Our Archives
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                A look back at our journey, milestones, and impact over the years. Explore our rich history of events and access our library of documents.
            </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">Archived Documents</h2>
            <ScrollArea className="h-96 w-full rounded-md border bg-slate-50 dark:bg-neutral-900/50 p-4">
                <ul className="space-y-4">
                  {resources.map((resource) => {
                    const IconComponent = resource.icon
                    return (
                      <li key={resource.id} className="p-4 border dark:border-neutral-800 rounded-lg flex items-center justify-between hover:bg-white dark:hover:bg-neutral-800/50 transition-colors shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <IconComponent size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{resource.title}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{resource.description}</p>
                          </div>
                        </div>
                        {resource.download ? (
                            <Button className="bg-primary hover:bg-primary/90 gap-2 shrink-0 ml-4">
                              <Download size={18} />
                              <span className="hidden sm:inline">Download</span>
                            </Button>
                          ) : (
                            <Button variant="outline" className="gap-2 bg-transparent shrink-0 ml-4">
                              <Video size={18} />
                              <span className="hidden sm:inline">Watch Now</span>
                            </Button>
                          )}
                      </li>
                    )
                  })}
                </ul>
            </ScrollArea>
          </div>
        </section>

      <div className="relative w-full overflow-clip">
        <Timeline data={timelineData} />
      </div>
    </main>
  );
}
