// Categories: Explore 9(ndex) and Bucket List Tabs share the same category list

export type Category = {
  label: string;
  value: string;
  types: string[];
};

export const categories: Category[] = [
  { label: "All", value: "all", types: [] },
  { label: "Beaches", value: "beaches", types: ["beach"] },
  { label: "Nature", value: "nature", types: ["mountains", "adventure"] },
  { label: "Cities", value: "cities", types: ["city", "history"] },
];

// Finds the label for a destination's category, for example "beach" gives "Beaches"
export function getCategoryLabel(itemCategory: string): string {
  return (
    categories.find((category) => category.types.includes(itemCategory))
      ?.label || "Cities"
  );
}
