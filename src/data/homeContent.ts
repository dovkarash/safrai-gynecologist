export type TimelineItem = {
  years: string
  text: string
}

export type SocialLink = {
  icon: 'facebook' | 'instagram'
  tooltip: string
  href: string
}

export type ContactFormField = {
  key: 'firstName' | 'lastName' | 'email' | 'phone' | 'message'
  type: 'text' | 'email' | 'tel' | 'textarea'
  label: string
  placeholder: string
  required?: boolean
}

export const homeContent = {
  hero: {
    tagline: 'רפואת נשים בגישה אישית ומקצועית',
    title: 'ד״ר מרים ספראי',
    subtitle: 'בריאות האישה ופוריות בהתאמה אישית לאורך שלבי החיים',
    imageAlt: 'ד״ר מרים ספראי',
    cta: {
      book: 'קביעת תור',
      more: 'לפרטים נוספים',
      moreHref: '#services',
    },
  },

  services: {
    title: 'רשימת שרותים',
  },

  about: {
    eyebrow: 'נעים להכיר',
    title: 'רופאת נשים שמחברת מקצועיות, רגישות ובהירות',
    paragraphs: [
      'ד״ר מרים ספראי היא רופאת נשים מומחית בתחום הפריון, טיפולי IVF, שימור פוריות וגיל המעבר. תחום ייחודי בעבודתה הוא ליווי גינקולוגי ופוריותי של נשים עם רקע אונקולוגי — משלב האבחנה ושימור הפוריות, דרך מענה גינקולוגי בתקופת הטיפולים, ועד מעקב לאחר החלמה ותכנון הריון.<br>בנוסף, ד״ר ספראי מבצעת מעקבים במצבים ייחודיים, כגון רזרבה שחלתית נמוכה, תסמונת טרנר, נשאות X שביר וגיל מעבר מוקדם. לצד עבודתה הקלינית, היא עוסקת במחקר בתחום הפריון ושימור הפוריות, מרצה בכנסים ומדריכה סטודנטים ומתמחים.',
    ],
    imageAlt: 'אודות',
    timeline: [
      {
        years: '2003–2005',
        text: 'תואר ראשון בביולוגיה, האוניברסיטה העברית בירושלים — סיום בהצטיינות.',
      },
      {
        years: '2005–2012',
        text: 'בוגרת בית הספר לרפואה של האוניברסיטה העברית והדסה, ירושלים.',
      },
      {
        years: '2015–2021',
        text: 'התמחות במיילדות וגינקולוגיה במרכז הרפואי הדסה.',
      },
      {
        years: '2022–2024',
        text: 'פוסט־דוקטורט ב־MWRI פיטסבורג, ארה״ב, בתחום שימור פוריות בילדים, ילדות ונשים.',
      },
      {
        years: '2024–2025',
        text: 'השתלמות עמיתים בתחום הפריון, IVF ושימור פוריות במרכז הרפואי שיבא.',
      },
      {
        years: 'החל משנת 2025',
        text: 'רופאה בכירה ביחידת ה־IVF במרכז הרפואי וולפסון, אחראית על שימור פוריות רפואי ואונקופוריות.',
      },
    ] satisfies TimelineItem[],
  },

  media: {
    title: 'בתקשורת',
    loadMore: 'הצגת עוד',
    loadMoreStep: 8,
  },

  articles: {
    title: 'מאמרים רפואיים',
    loadMore: 'הצגת עוד',
    loadMoreStep: 12,
  },

  contact: {
    eyebrow: 'נשמח לשמוע ממך',
    title: 'צור קשר',
    intro: 'אפשר להשאיר פרטים ונחזור אלייך בהקדם, או ליצור קשר ישירות עם המרפאה.',
    phoneLabel: 'טלפון:',
    phone: '03-0000000',
    hoursLabel: 'שעות פעילות:',
    hours: 'א׳–ה׳ 09:00–17:00',
    addressLabel: 'כתובת:',
    address: 'רח׳ הדוגמה 12, תל אביב',
    location: { lat: 32.0853, lng: 34.7818 },
    mapZoom: 16,
    mapHeight: 640,
    form: {
      fields: [
        { key: 'firstName', type: 'text', label: 'שם פרטי', placeholder: 'ישראל', required: true },
        { key: 'lastName', type: 'text', label: 'שם משפחה', placeholder: 'ישראלי', required: true },
        {
          key: 'email',
          type: 'email',
          label: 'אימייל',
          placeholder: 'israel@example.com',
          required: true,
        },
        { key: 'phone', type: 'tel', label: 'טלפון', placeholder: '050-0000000', required: true },
        {
          key: 'message',
          type: 'textarea',
          label: 'הודעה',
          placeholder: 'כתבו את הודעתכם כאן...',
        },
      ] satisfies ContactFormField[],
      submit: 'שליחת הודעה',
      success: 'הודעתך נשלחה בהצלחה!',
    },
    social: [
      {
        icon: 'facebook',
        tooltip: 'פייסבוק',
        href: 'https://www.facebook.com/profile.php?id=100063543434343',
      },
      {
        icon: 'instagram',
        tooltip: 'אימסטגרם',
        href: 'https://www.instagram.com/profile.php?id=100063543434343',
      },
    ] satisfies SocialLink[],
  },

  footer: {
    credit: 'Dov Karash',
  },
} as const
