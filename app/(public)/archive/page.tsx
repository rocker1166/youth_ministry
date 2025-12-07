"use client"
import React, { useState, useEffect } from "react";
import { Timeline } from "@/app/components/ui/timeline";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Download, FileText, Book, Video, Archive, Loader2 } from "lucide-react";
import { ScrollArea } from "@/app/components/ui/scroll-area";

interface ArchiveResource {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: typeof FileText | typeof Book | typeof Video;
  download: boolean;
}

const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'video':
      return Video;
    case 'book':
    case 'handbook':
    case 'guide':
      return Book;
    default:
      return FileText;
  }
};

export default function ArchivePage() {
  const [resources, setResources] = useState<ArchiveResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchiveResources();
  }, []);

  const fetchArchiveResources = async () => {
    try {
      const res = await fetch("/api/archive");
      if (res.ok) {
        const data = await res.json();
        setResources(data);
      } else {
        setResources([]);
      }
    } catch (error) {
      console.error("Error fetching archive resources:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

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
              src="/galary/3.jpeg"
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
              src="/galary/2.jpeg"
              alt="National Integration Camp 2023"
              width={200}
              height={200}
              className="h-auto w-1/2 rounded-lg object-cover shadow-sm"
            />
             <Image
              src="/galary/1.jpeg"
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
                src="/galary/11.jpeg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="opacity-40"
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
            
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin h-12 w-12 text-primary" />
              </div>
            ) : resources.length === 0 ? (
              /* Empty State Banner */
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/20">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-6">
                    <Archive className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">No Archived Documents Yet</h3>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    We haven't archived any documents yet. Check back soon for guidelines, handbooks, reports, and other valuable resources from the Institute of Youth Affairs.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-blue-500/10 px-6 py-3 rounded-lg border border-primary/20">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Documents will be added as they become available</span>
                  </div>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-96 w-full rounded-md border bg-slate-50 dark:bg-neutral-900/50 p-4">
                  <ul className="space-y-4">
                    {resources.map((resource) => {
                      const IconComponent = getIconForCategory(resource.category)
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
            )}
          </div>
        </section>

      <div className="relative w-full overflow-clip">
        <Timeline data={timelineData} />
      </div>
    </main>
  );
}
