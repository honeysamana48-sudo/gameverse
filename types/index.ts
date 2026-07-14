export type GameCategory =
  | "Action"
  | "Adventure"
  | "RPG"
  | "Racing"
  | "Sports"
  | "Shooter"
  | "Strategy"
  | "Horror"
  | "Open World";

export type Platform = "PC" | "PlayStation" | "Xbox" | "Steam";

export interface Game {
  id: string;
  slug: string;
  name: string;
  category: GameCategory;
  platform: Platform;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  isDeal: boolean;
  isFeatured: boolean;
  description: string;
  tags: string[];
}

export interface CartItem {
  game: Game;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (game: Game) => void;
  removeItem: (gameId: string) => void;
  increaseQuantity: (gameId: string) => void;
  decreaseQuantity: (gameId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (gameId: string) => boolean;
  isHydrated: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
}
