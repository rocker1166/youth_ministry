// Multilingual support utility
export const i18n = {
  translations: {
    en: {
      home: "Home",
      about: "About",
      events: "Events",
      news: "News",
      gallery: "Gallery",
      contact: "Contact",
      programs: "Programs",
      register: "Register",
      search: "Search",
      language: "Language",
      explore: "Explore More",
      readMore: "Read More",
      submit: "Submit",
      close: "Close",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      welcome: "Welcome",
      youth_affairs: "Institute of Youth Affairs",
    },
    hi: {
      home: "होम",
      about: "परिचय",
      events: "कार्यक्रम",
      news: "समाचार",
      gallery: "गैलरी",
      contact: "संपर्क करें",
      programs: "योजनाएं",
      register: "पंजीकृत करें",
      search: "खोज",
      language: "भाषा",
      explore: "और अन्वेषण करें",
      readMore: "और पढ़ें",
      submit: "जमा करें",
      close: "बंद करें",
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      welcome: "स्वागत है",
      youth_affairs: "युवा मामलों का संस्थान",
    },
  },

  t(key: string, lang = "en"): string {
    return (
      (this.translations[lang as keyof typeof this.translations]?.[
        key as keyof (typeof this.translations)[keyof typeof this.translations]
      ] as string) || key
    )
  },
}
