"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Game } from "@/types";
import { useState } from "react";

export default function GameActions({ game }: { game: Game }) {
  const { addItem, isInCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const inCart = isInCart(game.id);

  const handleAdd = () => {
    addItem(game);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuyNow = () => {
    addItem(game);
    router.push("/cart");
  };

  return (
    <div className="mt-6 flex gap-4">

      <button
        onClick={handleAdd}
        className={`px-6 py-3 rounded-lg font-semibold transition ${
          inCart
            ? "bg-green-600"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        {added ? "Added ✓" : inCart ? "In Cart ✓" : "Add to Cart"}
      </button>

      <button
        onClick={handleBuyNow}
        className="bg-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-violet-700"
      >
        Buy Now
      </button>

    </div>
  );
}