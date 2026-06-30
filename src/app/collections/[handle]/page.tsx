import { getCollectionProducts, getProducts, Product } from "@/lib/shopify";
import { CollectionClient } from "@/components/collections/collection-client";

export const revalidate = 0; // Disable cache for development or set to 60 for 1 minute

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle.toLowerCase();

  let products: Product[] = [];
  let title = "";

  if (handle === "sale") {
    title = "Sale";
    const allProducts = await getProducts(50);
    products = allProducts.slice(0, 8); // Same logic as mock
  } else if (handle === "abayas") {
    title = "Abayas";
    products = await getCollectionProducts("abayas");
  } else if (handle === "hijabs") {
    title = "Hijabs";
    products = await getCollectionProducts("hijabs");
  } else if (handle === "tunics" || handle === "tuniken") {
    title = "Tuniken";
    products = await getCollectionProducts("tuniken");
  } else {
    title = "Kollektion";
    products = await getProducts(50);
  }

  return (
    <CollectionClient initialProducts={products} title={title} />
  );
}
