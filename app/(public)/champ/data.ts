// National Integration Camp 2025 - Complete Data
// Extracted from official brochure

export interface DailyEvent {
  title: string
  type: 'seminar' | 'workshop' | 'cultural' | 'ceremony' | 'training'
  time?: string
  description?: string
}

export interface CampData {
  id: string
  title: string
  edition: string
  theme: string
  organizer: string
  organizerDetails: {
    name: string
    registrations: string[]
    address: string
    phone: string
    mobile: string
    email: string
  }
  startDate: string
  endDate: string
  location: string
  venue: string
  capacity: number
  expectedParticipants: number
  registrationFee: string
  eligibility: {
    minAge: number
    maxAge: number
    description: string
  }
  reportingInfo: {
    dates: string
    time: string
    place: string
  }
  inauguralCeremony: {
    date: string
    time: string
    venue: string
  }
  trainingSubjects: string[]
  faculties: string[]
  trainingPeriod: {
    startDate: string
    endDate: string
    timing: string
  }
  dailySchedule: {
    time: string
    activity: string
  }[]
  eventsByDate: Record<string, DailyEvent[]>
  objectives: string[]
  cooperatingBodies: string[]
  chiefAdvisor: {
    name: string
    title: string
  }
  advisors: {
    name: string
    title: string
  }[]
  leadership: {
    president: { name: string; title: string }
    organizationPresident: { name: string; title: string }
    vicePresident: { name: string }
    generalSecretary: { name: string }
    treasurer: { name: string }
    additionalGeneralSecretary: { name: string }
    secretaries: {
      culture: { name: string }
      training: { name: string }
      science: { name: string }
    }
  }
  coordinators: {
    main: { name: string; title: string }
    joint: { name: string; title: string }
    deputy: {
      name: string
      title: string
    }[]
  }
  campExecutives: string[]
  brochureImages: string[]
  missionVision: {
    history: string
    mission: string
    approach: string
    achievements: string
  }
  vvipGuests: string[]
  category: string
  status: string
}

export const CAMP_2025: CampData = {
  id: "nic-2025",
  title: "12th National Integration Camp",
  edition: "12th Edition",
  theme: "Empowerment of Youth for Golden India",
  organizer: "Institute of Youth Affairs",
  organizerDetails: {
    name: "INSTITUTE OF YOUTH AFFAIRS",
    registrations: [
      "Registered Under West Bengal Societies Registration Act. XXVI of 1961",
      "Registered Under Section 12AB, 80G of the Income Tax Act, 1961",
      "Registered Under NITI Aayog (NGO's Darpan), & CSR Govt. of India"
    ],
    address: "11/1, S. N. Banerjee Road, BKP., Kolkata – 700 120",
    phone: "033 7148 1515",
    mobile: "7439841005",
    email: "youthaffairs14@gmail.com"
  },
  startDate: "2025-12-24T10:00:00",
  endDate: "2025-12-31T17:00:00",
  location: "Assam University, Silchar, Assam",
  venue: "Various Venues, Assam University Campus",
  capacity: 500,
  expectedParticipants: 500,
  registrationFee: "Free of Cost",
  eligibility: {
    minAge: 14,
    maxAge: 22,
    description: "Youth and students of various classes and age groups from 14 to 22 years, from North-East States including Sikkim, Arunachal Pradesh, Assam, Tripura, Manipur, Meghalaya, Mizoram and Nagaland"
  },
  reportingInfo: {
    dates: "24 & 25 December 2025",
    time: "10:00 AM to 5:00 PM",
    place: "Assam University, Silchar"
  },
  inauguralCeremony: {
    date: "26 December 2025",
    time: "10:00 AM",
    venue: "Auditorium, Assam University, Silchar"
  },
  trainingSubjects: [
    "Yoga",
    "Aerobics",
    "Drill",
    "Music",
    "Dance",
    "Recitation",
    "Self Defence",
    "Games",
    "Career Guidance"
  ],
  faculties: [
    "Professor Alok K. Banerjee",
    "Dr. Tritha Pratim Das (ISRO)",
    "Dr. Sunny Mandachanda (DRDO)",
    "Shri Tithankar Chanda",
    "Smt. Archana Mondal",
    "Shri Mihir Bhattacharya",
    "Shri Anupam Chattopadhyay",
    "Shri Soumen Ghosh",
    "Shri Shantanu Chandra",
    "NCB Representatives",
    "Indian Army Personnel",
    "Indian Air Force Personnel",
    "Indian Navy Personnel"
  ],
  trainingPeriod: {
    startDate: "2025-12-26",
    endDate: "2025-12-30",
    timing: "09:00 AM to 04:30 PM"
  },
  dailySchedule: [
    { time: "09:00 AM", activity: "Assembly" },
    { time: "10:00 AM - 01:30 PM", activity: "Yoga / Aerobics / Self Defence / Drill / Dance / Music" },
    { time: "01:30 PM - 02:00 PM", activity: "Lunch Break" },
    { time: "02:00 PM - 03:30 PM", activity: "National Seminars" },
    { time: "03:30 PM - 04:30 PM", activity: "Games" },
    { time: "04:30 PM", activity: "Day Off" }
  ],
  eventsByDate: {
    "2025-12-26": [
      {
        title: "Inaugural Ceremony of the 12th National Integration Camp",
        type: "ceremony",
        time: "10:00 AM"
      },
      {
        title: "The Key Role of Youth for Future Space Science Exploration",
        type: "seminar"
      },
      {
        title: "Empowering Indian Youth for Global Leadership in Science & Its Innovation",
        type: "seminar"
      },
      {
        title: "Cultural Programmes",
        type: "cultural"
      }
    ],
    "2025-12-27": [
      {
        title: "The Part of Youth in Journey Towards Atmanirbhar Bharat in Defence Research & Development",
        type: "seminar"
      },
      {
        title: "Effects of Drug Abuse Among the Youth and Its Preventive Measures",
        type: "seminar"
      },
      {
        title: "Indian Culture: Heritage, Diversity & Sustainability",
        type: "seminar"
      },
      {
        title: "Cultural Workshop on Drama",
        type: "workshop"
      },
      {
        title: "Cultural Programmes",
        type: "cultural"
      }
    ],
    "2025-12-28": [
      {
        title: "Design Your Dreams in Ministry Defence",
        type: "seminar"
      },
      {
        title: "Environment Pollution, Its Impacts and Remediation",
        type: "seminar"
      },
      {
        title: "Cultural Workshop on Drama",
        type: "workshop"
      },
      {
        title: "Cultural Programmes",
        type: "cultural"
      }
    ],
    "2025-12-29": [
      {
        title: "National Integration & Youth Leadership Through Outdoor Education & Sports",
        type: "seminar"
      },
      {
        title: "Artificial Intelligence: Literacy, Applications, Security & Its Future",
        type: "seminar"
      },
      {
        title: "Cultural Workshop on Drama",
        type: "workshop"
      },
      {
        title: "Cultural Programmes",
        type: "cultural"
      }
    ],
    "2025-12-30": [
      {
        title: "Youth Empowerment: Enabling the Next Generation of Leaders for Golden India",
        type: "seminar"
      },
      {
        title: "Valedictory Ceremony with Demonstration, Prize & Award Distribution and Cultural Programmes",
        type: "ceremony"
      }
    ]
  },
  objectives: [
    "To empower youth in different subjects for making worthy Human beings",
    "To promote national integration, unity, and peace through youth exchange and collaborative activities",
    "To develop leadership and responsibility among youth",
    "To support Science research and innovation in youth-related issues and policies",
    "To arouse consciousness about the Cultural Heritage of our Country",
    "To lend a helping hand to poor & meritorious students and the aged, sick and helpless people",
    "To engage youth in social service and community development to foster a spirit of volunteerism",
    "To foster the spirit of Literacy, Scientific and Technical Education",
    "To promote youth affairs related Scientific and Cultural projects of the Central and State Government",
    "To popularize the idea of democracy among the masses and also to generate the spirit of Nationalism",
    "To arrange for seminars, lectures, meetings, exhibitions etc. at National Level, relating to Science and Culture and publish papers, bulletins, magazines etc.",
    "To train the youths in Self-development Schemes, Youth & National Integration",
    "To strengthen youth participation in democratic and developmental processes",
    "To provide training and skill development to enhance employability and entrepreneurship"
  ],
  cooperatingBodies: [
    "Government of Assam",
    "North Eastern Council, Government of India",
    "Defence Research and Development Organisation",
    "Ministry of Defence, Government of India",
    "Assam University, Silchar (A Central University)"
  ],
  chiefAdvisor: {
    name: "Professor Tathagata Roy",
    title: "Former Governor of Tripura, Meghalaya & Arunachal Pradesh"
  },
  advisors: [
    { name: "Shri Parimal Suklabaidya", title: "Hon'ble Member of Parliament, Lok Sabha" },
    { name: "Shri Samik Bhattacharya", title: "Hon'ble Member of Parliament, Rajya Sabha" },
    { name: "Shri Susmita Dev", title: "Hon'ble Member of Parliament, Rajya Sabha" },
    { name: "Shri Kanad Purkayastha", title: "Hon'ble Member of Parliament, Rajya Sabha" },
    { name: "Dr. Jayanta Kumar Roy", title: "Hon'ble Member of Parliament, Lok Sabha" },
    { name: "Shri Raju Bista", title: "Hon'ble Member of Parliament, Lok Sabha" },
    { name: "Shrimat Swami Atmapriyananda ji Maharaj", title: "Pro Chancellor, RKM University" },
    { name: "Professor Rajive Mohan Pant", title: "Hon'ble Vice-Chancellor, Assam University, Silchar" },
    { name: "Professor Basudeb Barman", title: "Former Vice Chancellor, Kalyani University" },
    { name: "Dr. Pradosh Kiran Nath", title: "Registrar, Assam University, Silchar" },
    { name: "Professor Dilip Kumar Baidya", title: "Director, NIT, Silchar" },
    { name: "Professor Pinakeswar Mahanta", title: "Director, National Institute of Technology, Meghalaya" }
  ],
  leadership: {
    president: {
      name: "Shri Kajal Kumar Sur",
      title: "President, National Integration Camp"
    },
    organizationPresident: {
      name: "Professor (Dr.) Basab Chaudhury",
      title: "Former Vice-Chancellor, WBSU & Sr. Director (Education), The Heritage Institute"
    },
    vicePresident: { name: "Shri Soumen Konar" },
    generalSecretary: { name: "Smt. Mohuya Saha" },
    treasurer: { name: "Smt. Mou Das" },
    additionalGeneralSecretary: { name: "Shri Alok Kumar Ghosh" },
    secretaries: {
      culture: { name: "Shri Anupam Chattopadhyay" },
      training: { name: "Shri Rajib De" },
      science: { name: "Dr. Suman Bhusan Chakraborty, University of Calcutta" }
    }
  },
  coordinators: {
    main: {
      name: "Professor M. Gangabhushan",
      title: "Department of Social Work, AUS"
    },
    joint: {
      name: "Professor Anup Kumar Dey",
      title: "Dean, Students' Welfare, AUS"
    },
    deputy: [
      { name: "Dr. Sanjay Sinha", title: "Department of Economics, AUS" },
      { name: "Dr. Jaganath Barman", title: "Department of Performing Arts, AUS" },
      { name: "Dr. Joyashri Dey", title: "Department of Social Work, AUS" },
      { name: "Mr. Roopjoyti Deb", title: "Assistant Registrar, NIT, Silchar" }
    ]
  },
  campExecutives: [
    "Shri Bidyut Paul",
    "Shri Prasenjit Ghosh",
    "Shri Swapan Das Mondal",
    "Shri Avijit Ghosh",
    "Shri Anirban Acharya",
    "Shri Biplab Paul",
    "Shri Amit Adhikary",
    "Shri Sumit Adhikary",
    "Ms. Nidhi Agarwal",
    "Ms. Komal Kurmi",
    "Ms. Moumita Sen",
    "Ms. Priyanka Biswas",
    "Ms. Sunanda Roy"
  ],
  brochureImages: [
    "/champ_25/Brochure, NIC, Institute of Youth Affairs_page-0001.jpg",
    "/champ_25/Brochure, NIC, Institute of Youth Affairs_page-0002.jpg",
    "/champ_25/Brochure, NIC, Institute of Youth Affairs_page-0003.jpg",
    "/champ_25/Brochure, NIC, Institute of Youth Affairs_page-0004.jpg"
  ],
  missionVision: {
    history: "Since 2014, the renowned social, voluntary and philanthropic society \"Institute of Youth Affairs\" was founded, it celebrates its journey with various annual commitments by yearly organized such National Integration Camp, National Seminars, National Science Awareness Campaign, and workshops to encourage the young minds in Science, to exchange mutually our cultural ties between students & youth of different corner of India, to make an eternal bond between students of all over India with the aim of implementing people-centered and community-oriented development programs with permanent impact on their life.",
    mission: "Our motto is to draw inspiration among students & youth from the vibrant colours of India's national flag saffron, white and green, and the blue chakra that reflects growth amid challenges. We generously organize this National Integration and Youth Leadership Camp since the organisation's inception and it has been 11 years of oath to convey a powerful message among the society by delivering our selfless care and service to bring the most remarkable change of this era.",
    approach: "In this National Integration Camp, mainly the participants are youth and students of various classes and the different age group from 14 to 22, are the future-generation of India, and here we also consider them as the pillar of new India. Throughout the camp period, we offer them efficient trainings on different courses and also happily arrange their lunch & refreshments during the eight days of the National Integration and Youth leadership Camp. Training subjects have been carefully chosen such as Yoga, Aerobics, Drill, Self-Defence, Parade, Career Guidance, Technical Education, Music & Dance and Audio-Drama by experts, high dignitaries, vice-chancellors, professors, trainers and so on as well as on self-defense, first-aid training for their self-development and self-help, self-reliant and a discipline life.",
    achievements: "We have had already successfully arranged this National Integration Camp in different states of India. In India, we have covered 11 states are witnesses in this National Integration and Youth Leadership Camp viz Karnataka, Rajasthan, Goa, Meghalaya, Gujarat, Assam, Tamil Nadu, Tripura, Andaman & Nicobar Island, Arunachal Pradesh and previous year in Sikkim."
  },
  vvipGuests: [
    "Dr. Himanta Biswa Sarma, Hon'ble Chief Minister, Government of Assam",
    "Dr. Sukanta Majumdar, Hon'ble Minister of State for Education & Development of North Eastern Region, Govt. of India",
    "Shri Parimal Suklabaidya, Hon'ble Member of Parliament, Lok Sabha",
    "Shri Kanad Purkayastha, Hon'ble Member of Parliament, Lok Sabha",
    "Shri Kaushik Rai, Hon'ble Minister, Department of Food, Public, Distribution & Consumer Affairs, Mines & Minerals, Barak Valley Development, Government of Assam"
  ],
  category: "National Integration",
  status: "upcoming"
}
