import { assetPath } from "@/lib/asset-path";

export const site = {
  name: "Udi Shlomo",
  title: "UDI SHLOMO",
  email: "udi.shlomo.music@gmail.com",
  phoneDisplay: "+47 410 64 044",
  phoneHref: "tel:+4741064044",
  location: "Trondheim, Norway",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://udishlomomusic.com",
  description:
    "Udi Shlomo is a drummer, composer and arranger living in Trondheim. World jazz drawn from Kibbutz Nahshon, Jewish tradition, and life in Norway.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Music", href: "/music" },
  { label: "Concerts", href: "/concerts" },
  { label: "Web Shop", href: "https://udishlomomusic.bandcamp.com/merch", external: true },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/udishlomomusic/" },
  { label: "Instagram", href: "https://www.instagram.com/udi.shlomo/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC0iY7um4wwFnxGXpzyKTm1g" },
  { label: "Spotify", href: "https://open.spotify.com/artist/3x9Pa86pQ8yQ4XcvsuDgGu" },
  { label: "Bandcamp", href: "https://udishlomomusic.bandcamp.com/" },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/udi-shlomo/1560199529" },
] as const;

export const spotify = {
  artistUrl: "https://open.spotify.com/artist/3x9Pa86pQ8yQ4XcvsuDgGu",
  embedUrl:
    "https://open.spotify.com/embed/artist/3x9Pa86pQ8yQ4XcvsuDgGu?utm_source=generator",
} as const;

export const bandsintown = {
  script: "https://widget.bandsintown.com/main.min.js",
  artistName: "Udi Shlomo Music",
  textColor: "#F4F1EA",
  linkColor: "#83623D",
  linkTextColor: "#F4F1EA",
  backgroundColor: "#1C202B",
  popupBackgroundColor: "#FFFFFF",
  displayLocalDates: "false",
  displayPastDates: "true",
  displayLimit: "15",
  autoStyle: "false",
} as const;

export const facebookPage = {
  href: "https://www.facebook.com/udishlomomusic/",
  posts: [
    "https://www.facebook.com/udishlomomusic/posts/pfbid0B4pXo3y1EFkMgB8KpSifca1HJ2c5SNBrpsCq5vR4WgZ17GpzuPEKrseNxCbQxpnMl",
    "https://www.facebook.com/photo.php?fbid=1519048800231663",
    "https://www.facebook.com/photo.php?fbid=1456873669782510",
  ],
} as const;

export const epkDownload =
  "https://www.dropbox.com/scl/fo/y8os3h3vs06pkkvscfwfu/AKi6PaRL3yKQU4aXfje5n4A?rlkey=hhfyin1fltdc79edss79so7vk&st=xu6qeap3&dl=0";

export const biography = [
  "Udi Shlomo is a drummer, composer and arranger, living and active in Norway (Trondheim) since 2010, originally from Kibbutz Nahshon, with roots from Iraq, Poland and former Czechoslovakia.",
  "This diverse background is being expressed in Shlomo’s music, that combines original compositions that are inspired by memories, pictures, stories and nature from his early life in the kibbutz, together with new arrangements of traditional Jewish music, and colored by the experience of life in Norway, away from the root, in the diaspora. This blend of cultures creates what today is called “World Jazz”",
  "Shlomo preforms and tours frequently both as a bandleader and a sideman, and has played at renowned venues such as: Pizzaexpress Jazz Club, Ankara Jazz Festival, Sibiu Jazz Festival, Oslo Jazz Festival, Trondheim Jazz Festival, Jerusalem Jazz Festival, Tel Aviv Jazz Festival, Usadba Jazz Festival, Blue Note Poznan, Delhi Jazz Festival, Jazz Dock, Jazzinec International Music Festival, Tangente Jazz+, Jazzfest Brno, Jazz Club Unterfahrt",
] as const;

export const venues = [
  "Pizzaexpress Jazz Club",
  "Ankara Jazz Festival",
  "Sibiu Jazz Festival",
  "Oslo Jazz Festival",
  "Trondheim Jazz Festival",
  "Jerusalem Jazz Festival",
  "Tel Aviv Jazz Festival",
  "Usadba Jazz Festival",
  "Blue Note Poznan",
  "Delhi Jazz Festival",
  "Jazz Dock",
  "Jazzinec International Music Festival",
  "Tangente Jazz+",
  "Jazzfest Brno",
  "Jazz Club Unterfahrt",
] as const;

export type ReviewFocus = "album" | "stage" | "drums";

export type Review = {
  id: string;
  quote: string;
  author: string;
  publication: string;
  href?: string;
  focus: ReviewFocus;
  home: boolean;
  about: boolean;
  epk: boolean;
};

export const reviews: Review[] = [
  {
    id: "aubre",
    quote:
      "Udi Shlomo’s You & Me is a testament to the drummer’s unique blend of influences, offering a fascinating exploration of “World Jazz.” With a firm grounding in various cultural musical traditions, Shlomo navigates the spectrum of moods and rhythms in each track. Shlomo’s presence is always palpable, guiding the ensemble with a supportive and vibrant touch from behind the drum set. The result is that You & Me brings attention to Shlomo’s status as a musical raconteur and a standout figure in the evolving world of jazz.",
    author: "Ferell Aubre",
    publication: "The Jazz Word",
    href: "https://bit.ly/3OGsKxB",
    focus: "album",
    home: true,
    about: true,
    epk: true,
  },
  {
    id: "sykora",
    quote:
      "The energetic interplay of the entire quintet, driven by the lead drummer, enriched us with another very special, beneficial jazz experience",
    author: "Michal Sýkora",
    publication: "JazzPort.cz",
    href: "https://jazzport.cz/2023/05/14/udi-shlomo-quintet-a-poogie-bell-juraj-griglak-band-na-jazzfestubrno/",
    focus: "stage",
    home: true,
    about: true,
    epk: true,
  },
  {
    id: "hufner",
    quote:
      "This quintet gives solid musical pleasure. A bunch of great musicians make a bunch of well composed music with indestructible arrangements and compositions. Music that you would like to immerse yourself in, that you would like to be surrounded by. What more do you need?",
    author: "Martin Hufner",
    publication: "NMZ - Neue Musikzeitung",
    focus: "album",
    home: true,
    about: true,
    epk: false,
  },
  {
    id: "concerto",
    quote:
      "Hallelujah, mobilize the songs on this CD. Very soon you’ll raise your bosom and start dancing along when Shlomo is on the move with his quintet (…) The bottom line is that fantastic world jazz is on offer on the sound carrier. Udi plays the melodies of his homeland in a fiery jazz version. Abramov and Schilderink shine with great solos and create a fat, voluminous brass sound. Shlomo himself is an extremely versatile drummer who has the rhythms firmly in his hands. “Ki Eshmera” is a traditional Hebrew song; all other songs are influenced in the same way by folk songs; aesthetically elegant melodies are convincing. Except for “Into the Blue” with its hymn-like character, the accelerator pedal is pressed down, pumping positive happy vibes. Recommended!",
    author: "CONCERTO Magazine",
    publication: "CONCERTO Magazine",
    focus: "album",
    home: true,
    about: true,
    epk: false,
  },
  {
    id: "lunde",
    quote:
      "…Shlomo’s percussion is in fact one of the most compelling aspects (…) he is all over his kit, splashing and clicking and ticking and thumping and rattling, sometimes with clear timing and patterns, sometimes just adding percussive color, and other times just flailing about even though he always remains purposeful and very, very clean. There are moments where his ability to produce what we hear with only his two hands and feet is shrouded in mystery…",
    author: "Brian S. Lunde",
    publication: "Jazzreview",
    focus: "drums",
    home: true,
    about: true,
    epk: false,
  },
  {
    id: "hauknes",
    quote:
      "Some music I enjoy in an intellectual way, and some music in a physical way, but in this concert I had it both…this music must be out there!",
    author: "Johan Hauknes",
    publication: "Salt-Peanuts",
    focus: "stage",
    home: true,
    about: true,
    epk: false,
  },
  {
    id: "spanko",
    quote:
      "“With his band, he brings such an unconventional view of coexistence, humility and opened the door to his world of jazz” music!",
    author: "Patrick Španko",
    publication: "Skjazz",
    focus: "stage",
    home: true,
    about: true,
    epk: false,
  },
  {
    id: "dupuis",
    quote: "Sitting still is difficult when listening",
    author: "Ferdinand Dupuis-Panther",
    publication: "Jazz'halo",
    focus: "stage",
    home: true,
    about: true,
    epk: false,
  },
  {
    id: "hammero",
    quote:
      "Constant confirmations that we were dealing with future voices that are guaranteed to make a strong impact in the years to come (…) what they had to report was the real kind – this was music they believed in and that really mattered. Highlights? Many!",
    author: "Tor Hammerø",
    publication: "Tor De Jazz",
    focus: "stage",
    home: true,
    about: true,
    epk: false,
  },
];

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const heroPhoto: Photo = {
  src: assetPath("/images/hero-udi-wide.jpg"),
  width: 2560,
  height: 1440,
  alt: "Udi Shlomo standing between two cymbals",
  caption: "Photograph by Bjørn Ánte Røe",
};

export const gallery: Photo[] = [
  {
    src: assetPath("/images/gallery/udi-transform.jpg"),
    width: 1365,
    height: 2048,
    alt: "Udi Shlomo playing drums at Trondheim Jazz Festival, a Transform bass drum in front of him",
    caption: "Trondheim Jazz Festival. Photograph by Javad Montazeri, 2023.",
  },
  {
    src: assetPath("/images/gallery/dsc4284.jpg"),
    width: 1000,
    height: 667,
    alt: "Udi Shlomo Quintet taking a bow on stage at Jazzfest Brno",
    caption: "Jazzfest Brno.",
  },
  {
    src: assetPath("/images/gallery/ostrava.jpg"),
    width: 1953,
    height: 1302,
    alt: "Udi Shlomo playing a ride cymbal under blue stage light",
    caption: "Ostrava.",
  },
  {
    src: assetPath("/images/gallery/dsc4253.jpg"),
    width: 1000,
    height: 667,
    alt: "Udi Shlomo Quintet performing at Jazzfest Brno, with trumpet, saxophone, bass, piano and drums",
    caption: "Jazzfest Brno.",
  },
  {
    src: assetPath("/images/gallery/dsc4267.jpg"),
    width: 1000,
    height: 667,
    alt: "Trumpet, bass, saxophone and drums of the Udi Shlomo Quintet at Jazzfest Brno",
    caption: "Jazzfest Brno.",
  },
  {
    src: assetPath("/images/gallery/dsc4126.jpg"),
    width: 1000,
    height: 667,
    alt: "Udi Shlomo at the drums with the quintet under red stage lights",
    caption: "Live with the quintet.",
  },
  {
    src: assetPath("/images/gallery/mikaela-canborn.jpg"),
    width: 856,
    height: 570,
    alt: "Udi Shlomo smiling behind a drum kit",
    caption: "Photograph by Mikaela Canborn.",
  },
  {
    src: assetPath("/images/gallery/trondheim-jazzfest.jpg"),
    width: 1536,
    height: 1024,
    alt: "Udi Shlomo in a dark suit playing drums at Trondheim Jazz Festival",
    caption: "Trondheim Jazz Festival. Photograph by Thor Egil Leirtø, 2021.",
  },
  {
    src: assetPath("/images/gallery/img-20230420.jpg"),
    width: 1024,
    height: 768,
    alt: "Udi Shlomo Quintet playing for a seated audience at Jazz Club Unterfahrt",
    caption: "Jazz Club Unterfahrt.",
  },
];

export const metrumPhoto: Photo = {
  src: assetPath("/images/gallery/metrum-jazz-club.webp"),
  width: 1125,
  height: 1526,
  alt: "Udi Shlomo between two cymbals",
  caption: "Udi Shlomo.",
};

export type Video = {
  id: string;
  title: string;
};

export const videos = {
  youAndMe1: {
    id: "F-cSBYIk8PQ",
    title: "Udi Shlomo - You & Me (Album teaser #1)",
  },
  itsAlright: {
    id: "SHmYZ61j46w",
    title: "Udi Shlomo - It's Alright Now - Jazz Club Unterfahrt",
  },
  youAndMe2: {
    id: "PBPtHrpKZlA",
    title: "Udi Shlomo - You & Me (Album teaser #2)",
  },
  brno: {
    id: "-a0GCGz5dPs",
    title: "Udi SHLOMO Quintet, JazzFestBrno, Cabaret des Péchés. 20.4.2023",
  },
  shalom: {
    id: "DNtNRgcUx48",
    title: "Udi Shlomo - Shalom Lachem - Trondheim Jazzfest",
  },
  veUlay: {
    id: "aOkcvRV2CKI",
    title: "Udi Shlomo - Ve Ulay/ Ki Eshmera Shabbat - Trondheim Jazzfest",
  },
  drorYikra: {
    id: "sDgLPmfR3TI",
    title: "Udi Shlomo - Dror Yikra - Jazz Club Unterfahrt",
  },
} as const satisfies Record<string, Video>;

export const musicVideos: Video[] = [
  videos.youAndMe1,
  videos.itsAlright,
  videos.youAndMe2,
  videos.brno,
  videos.shalom,
];

export const epkVideos: Video[] = [
  videos.veUlay,
  videos.drorYikra,
  videos.brno,
  videos.youAndMe1,
];
