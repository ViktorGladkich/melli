export interface ProductVariant {
  id: string;
  title: string;
}

export interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  category: string;
  price: string;
  brand: string;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  description?: string;
  material?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  // Abayas
  {
    id: "abaya-black",
    handle: "abaya-black",
    title: "Classic Black Abaya",
    category: "Abayas",
    price: "129.00 EUR",
    brand: "MILLY",
    description: "Eine zeitlose, klassische schwarze Abaya, die Eleganz und Bescheidenheit vereint. Aus hochwertigem, fließendem Stoff gefertigt, ideal für den Alltag oder besondere Anlässe.",
    material: "100% Premium Polyester. Maschinenwäsche bei 30°C. Nicht im Trockner trocknen.",
    images: [
      { url: "/products/abaya_black_front.jpg", altText: "Abaya Black Front" },
      { url: "/products/abaya_black_back.jpg", altText: "Abaya Black Back" },
      { url: "/products/abaya_beige_front.jpg", altText: "Abaya Detail" }
    ],
    variants: [{ id: "v1", title: "Default" }],
    options: [
      { name: "Color", values: ["Black", "Beige", "Green", "Pink", "Blue"] },
      { name: "Size", values: ["S", "M", "L", "XL"] }
    ]
  },
  {
    id: "abaya-pink",
    handle: "abaya-pink",
    title: "Dusty Pink Abaya",
    category: "Abayas",
    price: "149.00 EUR",
    brand: "MILLY",
    description: "Zarte, puderrosa Abaya mit weichem Fall. Perfekt für den Frühling und elegante Auftritte.",
    material: "95% Polyester, 5% Elasthan.",
    images: [
      { url: "/products/abaya_pink_front.jpg", altText: "Abaya Pink Front" },
      { url: "/products/abaya_pink_back.jpg", altText: "Abaya Pink Back" }
    ],
    variants: [{ id: "v4", title: "Default" }],
    options: [
      { name: "Color", values: ["Pink", "Beige", "Blue"] },
      { name: "Size", values: ["S", "M", "L", "XL"] }
    ]
  },
  {
    id: "abaya-green",
    handle: "abaya-green",
    title: "Olive Green Modest Dress",
    category: "Abayas",
    price: "139.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/abaya_green_front.jpg", altText: "Abaya Green Front" },
      { url: "/products/abaya_green_back.jpg", altText: "Abaya Green Back" }
    ],
    variants: [{ id: "v3", title: "Default" }],
    options: [{ name: "Color", values: ["Green", "Blue", "Black"] }, { name: "Size", values: ["S", "M", "L"] }]
  },
  {
    id: "abaya-beige",
    handle: "abaya-beige",
    title: "Desert Sand Abaya",
    category: "Abayas",
    price: "129.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/abaya_beige_front.jpg", altText: "Abaya Beige Front" },
      { url: "/products/abaya_beige_back.jpg", altText: "Abaya Beige Back" }
    ],
    variants: [{ id: "v2", title: "Default" }],
    options: [{ name: "Color", values: ["Beige", "Black", "Pink"] }]
  },
  {
    id: "abaya-blue",
    handle: "abaya-blue",
    title: "Pastel Blue Maxi",
    category: "Abayas",
    price: "145.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/abaya_blue_front.jpg", altText: "Abaya Blue Front" },
      { url: "/products/abaya_blue_back.jpg", altText: "Abaya Blue Back" }
    ],
    variants: [{ id: "v5", title: "Default" }],
    options: [{ name: "Color", values: ["Blue", "Green", "Pink"] }]
  },

  // Tuniken
  {
    id: "tunic-1",
    handle: "tunic-modest",
    title: "Modest Everyday Tunic",
    category: "Tuniken",
    price: "89.00 EUR",
    brand: "MILLY",
    images: [{ url: "/products/tunic_modest.png", altText: "Tunic Modest" }],
    variants: [{ id: "v1", title: "Default" }],
    options: [{ name: "Color", values: ["Beige", "Black"] }, { name: "Size", values: ["S", "M", "L", "XL"] }]
  },
  {
    id: "tunic-2",
    handle: "tunic-hijab",
    title: "Tunic & Hijab Set",
    category: "Tuniken",
    price: "119.00 EUR",
    brand: "MILLY",
    images: [{ url: "/products/tunic_modest_hijab.png", altText: "Tunic with Hijab" }],
    variants: [{ id: "v1", title: "Default" }],
    options: [{ name: "Color", values: ["Beige", "Pink"] }]
  },
  {
    id: "tunic-3",
    handle: "maxi-dress",
    title: "Casual Maxi Dress",
    category: "Tuniken",
    price: "129.00 EUR",
    brand: "MILLY",
    images: [{ url: "/products/maxi_dress.png", altText: "Maxi Dress" }],
    variants: [{ id: "v1", title: "Default" }],
    options: [{ name: "Color", values: ["Black", "Green"] }]
  },
  {
    id: "tunic-4",
    handle: "maxi-dress-hijab",
    title: "Maxi Dress & Hijab Set",
    category: "Tuniken",
    price: "149.00 EUR",
    brand: "MILLY",
    images: [{ url: "/products/maxi_dress_hijab.png", altText: "Maxi Dress Hijab" }],
    variants: [{ id: "v1", title: "Default" }],
    options: [{ name: "Color", values: ["Beige", "Blue"] }]
  },
  {
    id: "tunic-5",
    handle: "tunic-black-modest",
    title: "Classic Tunic Black",
    category: "Tuniken",
    price: "119.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/tunic_black_front.png", altText: "Black Tunic Front" },
      { url: "/products/tunic_black_back.png", altText: "Black Tunic Back" }
    ],
    variants: [{ id: "v5", title: "Default" }],
    options: [{ name: "Color", values: ["Black", "Beige"] }]
  },

  // Hijabs
  {
    id: "hijab-champagne",
    handle: "hijab-champagne",
    title: "Champagne Silk Hijab",
    category: "Hijabs",
    price: "49.00 EUR",
    brand: "MILLY",
    description: "Premium Seiden-Hijab in Champagner. Verleiht jedem Outfit einen Hauch von Luxus.",
    material: "100% Seide. Handwäsche empfohlen.",
    images: [
      { url: "/products/hijab_champagne_front.png", altText: "Champagne Hijab" },
      { url: "/products/hijab_champagne_back.png", altText: "Champagne Hijab Back" }
    ],
    variants: [{ id: "v1", title: "Default" }],
    options: [{ name: "Color", values: ["Beige", "Pink"] }]
  },
  {
    id: "hijab-2",
    handle: "hijab-chiffon-pink",
    title: "Chiffon Hijab Pink",
    category: "Hijabs",
    price: "29.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/hijab_chiffon_pink_front.png", altText: "Pink Hijab Front" },
      { url: "/products/hijab_chiffon_pink_back.png", altText: "Pink Hijab Back" }
    ],
    variants: [{ id: "v2", title: "Default" }],
    options: [{ name: "Color", values: ["Pink", "Beige"] }]
  },
  {
    id: "hijab-3",
    handle: "hijab-jersey-green",
    title: "Jersey Hijab Olive",
    category: "Hijabs",
    price: "25.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/hijab_jersey_olive_front.png", altText: "Olive Hijab Front" },
      { url: "/products/hijab_jersey_olive_back.png", altText: "Olive Hijab Back" }
    ],
    variants: [{ id: "v3", title: "Default" }],
    options: [{ name: "Color", values: ["Green", "Black"] }]
  },
  {
    id: "hijab-4",
    handle: "hijab-jersey-beige",
    title: "Jersey Hijab Sand",
    category: "Hijabs",
    price: "25.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/hijab_jersey_sand_front.png", altText: "Sand Hijab Front" },
      { url: "/products/hijab_jersey_sand_back.png", altText: "Sand Hijab Back" }
    ],
    variants: [{ id: "v4", title: "Default" }],
    options: [{ name: "Color", values: ["Beige", "White"] }]
  },
  {
    id: "hijab-5",
    handle: "hijab-silk-black",
    title: "Premium Silk Black",
    category: "Hijabs",
    price: "49.00 EUR",
    brand: "MILLY",
    images: [
      { url: "/products/hijab_silk_black_front.png", altText: "Black Silk Hijab Front" },
      { url: "/products/hijab_silk_black_back.png", altText: "Black Silk Hijab Back" }
    ],
    variants: [{ id: "v5", title: "Default" }],
    options: [{ name: "Color", values: ["Black", "Green"] }]
  }
];

export function getProductByHandle(handle: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.handle === handle);
}
