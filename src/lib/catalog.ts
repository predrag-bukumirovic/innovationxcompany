// Katalog je izveden iz objava sa @innovationxcompany (nazivi, krojevi i cene iz opisa objava).

export type Color = { id: string; name: string; hex: string };

export const COLORS = {
  bela: { id: "bela", name: "Bela", hex: "#f6f5f1" },
  krem: { id: "krem", name: "Krem", hex: "#e6dccb" },
  siva: { id: "siva", name: "Siva", hex: "#8f908b" },
  crna: { id: "crna", name: "Crna", hex: "#151515" },
  braon: { id: "braon", name: "Braon", hex: "#7b5443" },
  maslinasta: { id: "maslinasta", name: "Maslinasta", hex: "#5f6b46" },
  led: { id: "led", name: "Led", hex: "#c9cbc5" },
} satisfies Record<string, Color>;

export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export type Size = (typeof SIZES)[number];

export type Category = "oversized" | "standard" | "krop" | "sorc";

export const CATEGORIES: { id: Category | "sve"; label: string }[] = [
  { id: "sve", label: "Sve" },
  { id: "oversized", label: "Oversized" },
  { id: "standard", label: "Standard fit" },
  { id: "krop", label: "Krop" },
  { id: "sorc", label: "Šorcevi" },
];

export type Product = {
  id: string;
  name: string;
  print: string;
  category: Category;
  price: number;
  colors: Color[];
  image: string;
  hoverImage: string;
  lifestyleImage?: string;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "isnby-oversized",
    name: "Oversized majica",
    print: "I See Nothing But You",
    category: "oversized",
    price: 2000,
    colors: [COLORS.bela],
    image: "/images/isnby-white-3.jpg",
    hoverImage: "/images/isnby-white-2.jpg",
    lifestyleImage: "/images/isnby-white-2.jpg",
  },
  {
    id: "isnby-standard",
    name: "Standard fit majica",
    print: "I See Nothing But You",
    category: "standard",
    price: 1800,
    colors: [COLORS.krem, COLORS.bela],
    image: "/images/isnby-cream-3.jpg",
    hoverImage: "/images/isnby-cream-5.jpg",
  },
  {
    id: "isnby-krop",
    name: "Krop majica",
    print: "I See Nothing But You",
    category: "krop",
    price: 1500,
    colors: [COLORS.krem, COLORS.bela],
    image: "/images/isnby-cream-4.jpg",
    hoverImage: "/images/isnby-cream-1.jpg",
  },
  {
    id: "ntfr-oversized",
    name: "Oversized majica",
    print: "No Time For Romance",
    category: "oversized",
    price: 2000,
    colors: [COLORS.bela],
    image: "/images/ntfr-white-2.jpg",
    hoverImage: "/images/ntfr-white-4.jpg",
  },
  {
    id: "ntfr-standard",
    name: "Standard fit majica",
    print: "No Time For Romance",
    category: "standard",
    price: 1800,
    colors: [COLORS.siva, COLORS.bela],
    image: "/images/ntfr-grey-6.jpg",
    hoverImage: "/images/ntfr-grey-5.jpg",
  },
  {
    id: "ntfr-krop",
    name: "Krop majica",
    print: "No Time For Romance",
    category: "krop",
    price: 1500,
    colors: [COLORS.siva, COLORS.bela],
    image: "/images/ntfr-grey-1.jpg",
    hoverImage: "/images/ntfr-grey-4.jpg",
    lifestyleImage: "/images/ntfr-grey-4.jpg",
  },
  {
    id: "cocktail-oversized",
    name: "Oversized majica",
    print: "Cocktail Club",
    category: "oversized",
    price: 2000,
    colors: [COLORS.krem, COLORS.bela],
    image: "/images/cocktail-cream-4.jpg",
    hoverImage: "/images/cocktail-cream-5.jpg",
  },
  {
    id: "cocktail-standard",
    name: "Standard fit majica",
    print: "Cocktail Club",
    category: "standard",
    price: 1800,
    colors: [COLORS.bela],
    image: "/images/cocktail-white-4.jpg",
    hoverImage: "/images/cocktail-white-5.jpg",
    lifestyleImage: "/images/cocktail-white-5.jpg",
    badge: "Hit",
  },
  {
    id: "cocktail-krop",
    name: "Krop majica",
    print: "Cocktail Club",
    category: "krop",
    price: 1500,
    colors: [COLORS.bela],
    image: "/images/cocktail-white-3.jpg",
    hoverImage: "/images/cocktail-white-0.jpg",
  },
  {
    id: "txtme-oversized",
    name: "Oversized majica",
    print: "Text Me When You Get Home",
    category: "oversized",
    price: 2000,
    colors: [COLORS.crna],
    image: "/images/txtme-black-6.jpg",
    hoverImage: "/images/txtme-black-3.jpg",
    lifestyleImage: "/images/txtme-black-4.jpg",
    badge: "Hit",
  },
  {
    id: "sorc-braon",
    name: "Unisex šorc",
    print: "Braon",
    category: "sorc",
    price: 1600,
    colors: [COLORS.braon],
    image: "/images/shorts-brown-3.jpg",
    hoverImage: "/images/shorts-brown-1.jpg",
  },
  {
    id: "sorc-maslinasti",
    name: "Unisex šorc",
    print: "Maslinasti",
    category: "sorc",
    price: 1600,
    colors: [COLORS.maslinasta],
    image: "/images/shorts-olive-0.jpg",
    hoverImage: "/images/shorts-olive-2.jpg",
  },
  {
    id: "sorc-led",
    name: "Unisex šorc",
    print: "Led",
    category: "sorc",
    price: 1600,
    colors: [COLORS.led],
    image: "/images/shorts-ice-3.jpg",
    hoverImage: "/images/shorts-ice-2.jpg",
    badge: "Favorit",
  },
  {
    id: "sorc-crni",
    name: "Unisex šorc",
    print: "Crni, pamučni",
    category: "sorc",
    price: 1600,
    colors: [COLORS.crna],
    image: "/images/shorts-black-3.jpg",
    hoverImage: "/images/shorts-black-0.jpg",
  },
];

export const TRENDING_IDS = ["cocktail-standard", "txtme-oversized", "ntfr-krop", "isnby-oversized"];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(value: number) {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD`;
}

export type Collection = {
  id: string;
  name: string;
  description: string;
  pieces: { label: string; price: number }[];
  images: [string, string];
};

export const COLLECTIONS: Collection[] = [
  {
    id: "isnby",
    name: "I See Nothing But You",
    description: "Bordo print, krem i bela boja",
    pieces: [
      { label: "Oversized", price: 2000 },
      { label: "Standard fit", price: 1800 },
      { label: "Krop", price: 1500 },
      { label: "Šorc", price: 1600 },
    ],
    images: ["/images/isnby-cream-0.jpg", "/images/isnby-white-4.jpg"],
  },
  {
    id: "ntfr",
    name: "No Time For Romance",
    description: "Crveni INV print, siva i bela boja",
    pieces: [
      { label: "Oversized", price: 2000 },
      { label: "Standard fit", price: 1800 },
      { label: "Krop", price: 1500 },
      { label: "Šorc", price: 1600 },
    ],
    images: ["/images/ntfr-grey-0.jpg", "/images/ntfr-white-1.jpg"],
  },
  {
    id: "cocktail",
    name: "Cocktail Club",
    description: "Print sa limetom, krem i bela boja",
    pieces: [
      { label: "Oversized", price: 2000 },
      { label: "Standard fit", price: 1800 },
      { label: "Krop", price: 1500 },
      { label: "Šorc", price: 1600 },
    ],
    images: ["/images/cocktail-cream-0.jpg", "/images/cocktail-white-3.jpg"],
  },
  {
    id: "txtme",
    name: "Text Me When You Get Home",
    description: "Beli print na crnoj majici",
    pieces: [
      { label: "Oversized", price: 2000 },
      { label: "Unisex šorc", price: 1600 },
    ],
    images: ["/images/txtme-black-5.jpg", "/images/txtme-black-2.jpg"],
  },
];

export const INSTAGRAM = {
  handle: "innovationxcompany",
  url: "https://www.instagram.com/innovationxcompany/",
  dm: "https://ig.me/m/innovationxcompany",
};
