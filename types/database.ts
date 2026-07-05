export type Game = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  platform: string;
  image: string;
  price: number;
  original_price: number;
  discount_percent: number;
  rating: number;
  is_deal: boolean;
  is_featured: boolean;
};