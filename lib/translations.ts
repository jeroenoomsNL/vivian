export type Language = "nl" | "en";

export const translations = {
  nl: {
    // Navigation
    nav: {
      home: "Home",
      volunteer: "Vrijwilliger",
      events: "Evenementen",
      jobs: "Vacatures",
      language: "EN",
      languageLabel: "Schakel naar Engels",
      skipToContent: "Ga naar inhoud",
    },

    // Homepage
    home: {
      heroTitle: "Maak het verschil",
      heroSubtitle:
        "Samen helpen we vluchtelingen een nieuw thuis te vinden in Nederland",
      ctaButton: "Word vrijwilliger",
      ctaButtonAriaLabel: "Word vrijwilliger bij Vluchtelingenwerk Nederland",
      heroCta: "Ontdek wat jij kan doen",
      locationDetected: "We hebben je locatie gedetecteerd",
      nearYou: "In de buurt van",
      section1Title: "Vrijwilligerswerk",
      section1Text:
        "Als vrijwilliger bij Vluchtelingenwerk Nederland ondersteun je vluchtelingen bij hun integratie in de Nederlandse samenleving.",
      section1Link: "Meer over vrijwilligerswerk",
      section2Title: "Evenementen",
      section2Text:
        "Doe mee aan onze activiteiten en evenementen in jouw regio. Van informatiebijeenkomsten tot praktische workshops.",
      section2Link: "Bekijk alle evenementen",
      section3Title: "Vacatures",
      section3Text:
        "Op zoek naar een betaalde baan waarbij je een bijdrage levert? Bekijk onze openstaande vacatures.",
      section3Link: "Bekijk vacatures",
      statsVolunteers: "vrijwilligers",
      statsRefugees: "vluchtelingen geholpen",
      statsRegions: "regio's actief",
      statsYears: "jaar ervaring",
    },

    // Chatbot
    chat: {
      title: "Vivian",
      subtitle: "Jouw persoonlijke assistent",
      open: "Open chat met Vivian",
      close: "Sluit chat",
      inputPlaceholder: "Typ een bericht...",
      send: "Verstuur",
      locationText: "📍 Locatie gedetecteerd:",
      greeting:
        "Hallo! Ik ben Vivian, jouw persoonlijke assistent van Vluchtelingenwerk Nederland. Ik help je op weg als vrijwilliger! 👋",
      askName: "Wat is jouw naam?",
      nameResponse: (name: string) =>
        `Leuk je te ontmoeten, ${name}! 😊 Fijn dat je overweegt om vrijwilliger te worden.`,
      askKnowledge:
        "Weet je wat het inhoudt om vrijwilliger te zijn bij Vluchtelingenwerk Nederland?",
      optionYes: "Ja",
      optionNo: "Nee",
      knowledgeYesResponse: "Top! Dan gaan we direct verder. 🎉",
      knowledgeNoResponse:
        "Geen probleem! Laat me je meer vertellen over wat vrijwilligerswerk bij Vluchtelingenwerk inhoudt.",
      knowledgeInfo:
        "Als vrijwilliger help je vluchtelingen bij hun integratie in Nederland. Dit kan zijn door taalles geven, helpen bij bureaucratie, of gewoon een vriendelijk gezicht zijn. Bekijk deze video voor meer informatie:",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Wat doet Vluchtelingenwerk?",
      afterVideo:
        "Nu je meer weet over vrijwilligerswerk, laten we kijken hoeveel tijd je beschikbaar hebt.",
      askTime:
        "Hoeveel tijd wil je als vrijwilliger besteden bij Vluchtelingenwerk?",
      time1: "1 dag per week",
      time2: "5 uur per week",
      time3: "Voltijd 3 maanden",
      timeResponse: (time: string) =>
        `Geweldig! ${time} klinkt perfect. We gaan een passende rol voor je zoeken.`,
      finalMessage:
        "Op basis van jouw beschikbaarheid ga ik de beste matches zoeken. Heb je nog vragen?",
      errorMessage: "Er is iets misgegaan. Probeer het opnieuw.",
      thinking: "Vivian is aan het typen...",
      poweredBy: "Mogelijk gemaakt door OpenAI",
    },

    // Volunteer page
    volunteer: {
      title: "Vrijwilligerswerk",
      subtitle: "Maak een verschil in het leven van vluchtelingen",
      heroText:
        "Als vrijwilliger bij Vluchtelingenwerk Nederland draag je direct bij aan de integratie van vluchtelingen. Jij maakt het verschil!",
      whyTitle: "Waarom vrijwilliger worden?",
      why1Title: "Persoonlijke groei",
      why1Text:
        "Vergroot je interculturele competenties en doe waardevolle ervaring op.",
      why2Title: "Gemeenschapszin",
      why2Text:
        "Word deel van een hechte gemeenschap van mensen die hetzelfde doel nastreven.",
      why3Title: "Direct impact",
      why3Text:
        "Zie direct het verschil dat je maakt in het leven van een vluchteling.",
      rolesTitle: "Wat kun je doen?",
      role1: "Taalbuddy",
      role1Desc: "Help een vluchteling met het leren van Nederlands",
      role2: "Maatje",
      role2Desc: "Begeleid een vluchteling bij het dagelijks leven",
      role3: "Juridisch begeleider",
      role3Desc: "Ondersteuning bij juridische procedures",
      role4: "Activiteitenbegeleider",
      role4Desc: "Organiseer en begeleid activiteiten",
      ctaButton: "Start nu met Vivian",
      requirementsTitle: "Wat vragen we van jou?",
      req1: "Minimaal 16 jaar oud",
      req2: "Betrouwbaar en betrokken",
      req3: "Minimaal 2 uur per week beschikbaar",
      req4: "Bereid om een VOG aan te vragen",
    },

    // Events page
    events: {
      title: "Evenementen",
      subtitle: "Activiteiten en bijeenkomsten in jouw regio",
      filterAll: "Alle evenementen",
      filterTraining: "Training",
      filterInfo: "Informatie",
      filterActivity: "Activiteit",
      noEvents: "Geen evenementen gevonden",
      register: "Aanmelden",
      free: "Gratis",
      online: "Online",
      inPerson: "Fysiek",
      readMore: "Meer info",
      eventList: [
        {
          id: 1,
          title: "Introductiedag Vrijwilligers",
          date: "15 maart 2026",
          time: "10:00 - 16:00",
          location: "Amsterdam",
          type: "Training",
          free: true,
          online: false,
          description:
            "Een dag vol informatie en inspiratie voor nieuwe vrijwilligers. Leer alles over de organisatie en je rol.",
        },
        {
          id: 2,
          title: "Webinar: Omgaan met trauma",
          date: "22 maart 2026",
          time: "19:00 - 20:30",
          location: "Online",
          type: "Training",
          free: true,
          online: true,
          description:
            "In dit webinar leer je hoe je kunt omgaan met trauma bij vluchtelingen en hoe je hier op een goede manier mee omgaat.",
        },
        {
          id: 3,
          title: "Informatieavond Rotterdam",
          date: "28 maart 2026",
          time: "18:30 - 20:00",
          location: "Rotterdam",
          type: "Informatie",
          free: true,
          online: false,
          description:
            "Kom meer te weten over vrijwilligerswerk bij Vluchtelingenwerk in Rotterdam en omgeving.",
        },
        {
          id: 4,
          title: "Sportdag voor Vluchtelingen",
          date: "5 april 2026",
          time: "11:00 - 17:00",
          location: "Utrecht",
          type: "Activiteit",
          free: true,
          online: false,
          description:
            "Doe mee aan een sportieve dag voor vluchtelingen en vrijwilligers. Samen sporten, samen lachen!",
        },
        {
          id: 5,
          title: "Training Taalbuddy",
          date: "12 april 2026",
          time: "09:00 - 17:00",
          location: "Den Haag",
          type: "Training",
          free: true,
          online: false,
          description:
            "Specifieke training voor vrijwilligers die als taalbuddy aan de slag willen gaan.",
        },
        {
          id: 6,
          title: "Online Q&A Sessie",
          date: "19 april 2026",
          time: "20:00 - 21:00",
          location: "Online",
          type: "Informatie",
          free: true,
          online: true,
          description:
            "Heb je vragen over vrijwilligerswerk? Stel ze live aan onze coördinator.",
        },
      ],
    },

    // Jobs page
    jobs: {
      title: "Vacatures",
      subtitle: "Betaalde banen bij Vluchtelingenwerk Nederland",
      filterAll: "Alle vacatures",
      filterFullTime: "Fulltime",
      filterPartTime: "Parttime",
      filterInternship: "Stage",
      noJobs: "Geen vacatures gevonden",
      apply: "Solliciteren",
      hoursPerWeek: "uur/week",
      location: "Locatie",
      department: "Afdeling",
      jobList: [
        {
          id: 1,
          title: "Coördinator Vrijwilligers",
          location: "Amsterdam",
          hours: 32,
          type: "Parttime",
          department: "Vrijwilligerswerk",
          description:
            "Ben jij een organisator die energie krijgt van mensen? Als coördinator vrijwilligers ben je het aanspreekpunt voor onze vrijwilligers.",
          requirements: [
            "HBO werk- en denkniveau",
            "Ervaring met vrijwilligersmanagement",
            "Goede communicatieve vaardigheden",
          ],
        },
        {
          id: 2,
          title: "Juridisch Medewerker",
          location: "Rotterdam",
          hours: 40,
          type: "Fulltime",
          department: "Juridische Begeleiding",
          description:
            "Als juridisch medewerker ondersteun je vluchtelingen bij hun asielprocedure en bied je rechtshulp.",
          requirements: [
            "HBO/WO Rechten",
            "Kennis van vreemdelingenrecht",
            "Empathisch en analytisch",
          ],
        },
        {
          id: 3,
          title: "Communicatiemedewerker",
          location: "Den Haag",
          hours: 24,
          type: "Parttime",
          department: "Communicatie",
          description:
            "Help ons de boodschap van Vluchtelingenwerk te verspreiden via social media, nieuwsbrieven en andere kanalen.",
          requirements: [
            "HBO Communicatie of Marketing",
            "Ervaring met social media",
            "Creatief en klantgericht",
          ],
        },
        {
          id: 4,
          title: "Stage Maatschappelijk Werk",
          location: "Utrecht",
          hours: 32,
          type: "Stage",
          department: "Maatschappelijke Dienstverlening",
          description:
            "Loop stage bij onze afdeling maatschappelijk werk en doe praktijkervaring op in een bijzondere omgeving.",
          requirements: [
            "Studie Maatschappelijk Werk of HBO Sociaal Werk",
            "Goede schrijfvaardigheid",
            "Culturele sensitiviteit",
          ],
        },
      ],
    },

    // Footer
    footer: {
      description:
        "Vluchtelingenwerk Nederland zet zich in voor de bescherming en maatschappelijke positie van vluchtelingen en asielzoekers.",
      quickLinks: "Snelle links",
      contact: "Contact",
      address: "Postbus 2894, 1000 CW Amsterdam",
      phone: "020 - 346 72 00",
      email: "info@vluchtelingenwerk.nl",
      social: "Volg ons",
      rights: "Alle rechten voorbehouden",
      privacy: "Privacybeleid",
      terms: "Algemene voorwaarden",
      cookies: "Cookiebeleid",
    },
  },
  en: {
    nav: {
      home: "Home",
      volunteer: "Volunteer",
      events: "Events",
      jobs: "Jobs",
      language: "NL",
      languageLabel: "Switch to Dutch",
      skipToContent: "Skip to content",
    },
    home: {
      heroTitle: "Make a difference",
      heroSubtitle:
        "Together we help refugees find a new home in the Netherlands",
      ctaButton: "Become a volunteer",
      ctaButtonAriaLabel: "Become a volunteer at Vluchtelingenwerk Nederland",
      heroCta: "Discover what you can do",
      locationDetected: "We detected your location",
      nearYou: "Near",
      section1Title: "Volunteering",
      section1Text:
        "As a volunteer at Vluchtelingenwerk Nederland, you support refugees in their integration into Dutch society.",
      section1Link: "More about volunteering",
      section2Title: "Events",
      section2Text:
        "Join our activities and events in your region. From information sessions to practical workshops.",
      section2Link: "View all events",
      section3Title: "Jobs",
      section3Text:
        "Looking for a paid job where you make a contribution? Browse our open vacancies.",
      section3Link: "View vacancies",
      statsVolunteers: "volunteers",
      statsRefugees: "refugees helped",
      statsRegions: "active regions",
      statsYears: "years experience",
    },
    chat: {
      title: "Vivian",
      subtitle: "Your personal assistant",
      open: "Open chat with Vivian",
      close: "Close chat",
      inputPlaceholder: "Type a message...",
      send: "Send",
      locationText: "📍 Location detected:",
      greeting:
        "Hello! I am Vivian, your personal assistant from Vluchtelingenwerk Nederland. I will help you on your journey as a volunteer! 👋",
      askName: "What is your name?",
      nameResponse: (name: string) =>
        `Nice to meet you, ${name}! 😊 Great that you are considering volunteering.`,
      askKnowledge:
        "Do you know what it means to be a volunteer at Vluchtelingenwerk Nederland?",
      optionYes: "Yes",
      optionNo: "No",
      knowledgeYesResponse: "Great! Let's continue. 🎉",
      knowledgeNoResponse:
        "No problem! Let me tell you more about what volunteering at Vluchtelingenwerk entails.",
      knowledgeInfo:
        "As a volunteer, you help refugees integrate into the Netherlands. This can include giving language lessons, helping with bureaucracy, or simply being a friendly face. Watch this video for more information:",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "What does Vluchtelingenwerk do?",
      afterVideo:
        "Now that you know more about volunteering, let's see how much time you have available.",
      askTime:
        "How much time would you like to spend as a volunteer at Vluchtelingenwerk?",
      time1: "1 day per week",
      time2: "5 hours per week",
      time3: "Full-time 3 months",
      timeResponse: (time: string) =>
        `Great! ${time} sounds perfect. We will find a suitable role for you.`,
      finalMessage:
        "Based on your availability, I will find the best matches. Do you have any questions?",
      errorMessage: "Something went wrong. Please try again.",
      thinking: "Vivian is typing...",
      poweredBy: "Powered by OpenAI",
    },
    volunteer: {
      title: "Volunteering",
      subtitle: "Make a difference in the lives of refugees",
      heroText:
        "As a volunteer at Vluchtelingenwerk Nederland, you directly contribute to the integration of refugees. You make the difference!",
      whyTitle: "Why become a volunteer?",
      why1Title: "Personal growth",
      why1Text:
        "Expand your intercultural competencies and gain valuable experience.",
      why2Title: "Community spirit",
      why2Text:
        "Become part of a close community of people with the same goal.",
      why3Title: "Direct impact",
      why3Text:
        "See directly the difference you make in the life of a refugee.",
      rolesTitle: "What can you do?",
      role1: "Language buddy",
      role1Desc: "Help a refugee learn Dutch",
      role2: "Companion",
      role2Desc: "Guide a refugee in daily life",
      role3: "Legal guide",
      role3Desc: "Support with legal procedures",
      role4: "Activity guide",
      role4Desc: "Organize and guide activities",
      ctaButton: "Start now with Vivian",
      requirementsTitle: "What do we ask of you?",
      req1: "At least 16 years old",
      req2: "Reliable and committed",
      req3: "At least 2 hours per week available",
      req4: "Willing to apply for a VOG",
    },
    events: {
      title: "Events",
      subtitle: "Activities and meetings in your region",
      filterAll: "All events",
      filterTraining: "Training",
      filterInfo: "Information",
      filterActivity: "Activity",
      noEvents: "No events found",
      register: "Register",
      free: "Free",
      online: "Online",
      inPerson: "In person",
      readMore: "More info",
      eventList: [
        {
          id: 1,
          title: "Introduction Day Volunteers",
          date: "March 15, 2026",
          time: "10:00 - 16:00",
          location: "Amsterdam",
          type: "Training",
          free: true,
          online: false,
          description:
            "A day full of information and inspiration for new volunteers. Learn everything about the organization and your role.",
        },
        {
          id: 2,
          title: "Webinar: Dealing with trauma",
          date: "March 22, 2026",
          time: "19:00 - 20:30",
          location: "Online",
          type: "Training",
          free: true,
          online: true,
          description:
            "In this webinar you will learn how to deal with trauma in refugees and how to handle it in a good way.",
        },
        {
          id: 3,
          title: "Information evening Rotterdam",
          date: "March 28, 2026",
          time: "18:30 - 20:00",
          location: "Rotterdam",
          type: "Information",
          free: true,
          online: false,
          description:
            "Learn more about volunteering at Vluchtelingenwerk in Rotterdam and surroundings.",
        },
        {
          id: 4,
          title: "Sports day for Refugees",
          date: "April 5, 2026",
          time: "11:00 - 17:00",
          location: "Utrecht",
          type: "Activity",
          free: true,
          online: false,
          description:
            "Join a sports day for refugees and volunteers. Sport together, laugh together!",
        },
        {
          id: 5,
          title: "Language Buddy Training",
          date: "April 12, 2026",
          time: "09:00 - 17:00",
          location: "The Hague",
          type: "Training",
          free: true,
          online: false,
          description:
            "Specific training for volunteers who want to start as a language buddy.",
        },
        {
          id: 6,
          title: "Online Q&A Session",
          date: "April 19, 2026",
          time: "20:00 - 21:00",
          location: "Online",
          type: "Information",
          free: true,
          online: true,
          description:
            "Do you have questions about volunteering? Ask them live to our coordinator.",
        },
      ],
    },
    jobs: {
      title: "Jobs",
      subtitle: "Paid positions at Vluchtelingenwerk Nederland",
      filterAll: "All vacancies",
      filterFullTime: "Full-time",
      filterPartTime: "Part-time",
      filterInternship: "Internship",
      noJobs: "No vacancies found",
      apply: "Apply",
      hoursPerWeek: "hrs/week",
      location: "Location",
      department: "Department",
      jobList: [
        {
          id: 1,
          title: "Volunteer Coordinator",
          location: "Amsterdam",
          hours: 32,
          type: "Parttime",
          department: "Volunteering",
          description:
            "Are you an organizer who gets energy from people? As volunteer coordinator you are the point of contact for our volunteers.",
          requirements: [
            "HBO level",
            "Experience with volunteer management",
            "Good communication skills",
          ],
        },
        {
          id: 2,
          title: "Legal Officer",
          location: "Rotterdam",
          hours: 40,
          type: "Fulltime",
          department: "Legal Support",
          description:
            "As a legal officer you support refugees with their asylum procedure and provide legal assistance.",
          requirements: [
            "HBO/WO Law",
            "Knowledge of immigration law",
            "Empathetic and analytical",
          ],
        },
        {
          id: 3,
          title: "Communications Officer",
          location: "The Hague",
          hours: 24,
          type: "Parttime",
          department: "Communications",
          description:
            "Help us spread the message of Vluchtelingenwerk via social media, newsletters and other channels.",
          requirements: [
            "HBO Communications or Marketing",
            "Experience with social media",
            "Creative and customer-oriented",
          ],
        },
        {
          id: 4,
          title: "Social Work Internship",
          location: "Utrecht",
          hours: 32,
          type: "Stage",
          department: "Social Services",
          description:
            "Do an internship at our social work department and gain practical experience in a special environment.",
          requirements: [
            "Social Work study",
            "Good writing skills",
            "Cultural sensitivity",
          ],
        },
      ],
    },
    footer: {
      description:
        "Vluchtelingenwerk Nederland is committed to the protection and social position of refugees and asylum seekers.",
      quickLinks: "Quick links",
      contact: "Contact",
      address: "P.O. Box 2894, 1000 CW Amsterdam",
      phone: "020 - 346 72 00",
      email: "info@vluchtelingenwerk.nl",
      social: "Follow us",
      rights: "All rights reserved",
      privacy: "Privacy policy",
      terms: "Terms and conditions",
      cookies: "Cookie policy",
    },
  },
} as const;

export type Translations = typeof translations.nl;
