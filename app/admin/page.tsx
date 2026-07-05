"use client";

import { useEffect, useState } from "react";
import AddGameForm from "@/components/admin/AddGameForm";
import { fetchGames, deleteGame, updateGame } from "@/lib/adminGames";

export default function AdminPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGame, setEditingGame] = useState<any | null>(null);

  // ✅ LOGIN STATE (FIXED)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  async function loadGames() {
    setLoading(true);
    const data = await fetchGames();
    setGames(data);
    setLoading(false);
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadGames();
    }
  }, [isLoggedIn]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this game?")) return;

    await deleteGame(id);
    loadGames();
  }

  // 🔐 LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-[#111827] p-6 rounded-xl w-80">

          <h1 className="text-xl font-bold mb-4">Admin Login</h1>

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 bg-black border border-gray-600 rounded mb-3"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-black border border-gray-600 rounded mb-4"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />

          <button
            onClick={() => {
              if (
                loginForm.username === "gameverse0333" &&
                loginForm.password === "Arshpreet@1"
              ) {
                setIsLoggedIn(true);
              } else {
                alert("Wrong username or password");
              }
            }}
            className="w-full bg-violet-600 py-2 rounded"
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // 🔥 DASHBOARD
  <div className="mb-6 flex gap-3">
  
  <a
    href="/admin/orders"
    className="bg-cyan-600 px-4 py-2 rounded-lg font-semibold"
  >
    View Orders 📦
  </a>

</div>
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* ADD GAME */}
      <AddGameForm onSuccess={loadGames} />

      {/* EDIT POPUP */}
      {editingGame && (
        <div className="mt-10 p-6 bg-[#111827] border border-gray-700 rounded-xl">

          <h2 className="text-2xl font-bold mb-4">
            Edit Game
          </h2>

          <input
            className="w-full p-2 mb-3 bg-black border border-gray-600 rounded"
            value={editingGame.name}
            onChange={(e) =>
              setEditingGame({ ...editingGame, name: e.target.value })
            }
            placeholder="Game Name"
          />

          <input
            className="w-full p-2 mb-3 bg-black border border-gray-600 rounded"
            value={editingGame.price}
            onChange={(e) =>
              setEditingGame({ ...editingGame, price: Number(e.target.value) })
            }
            placeholder="Price"
          />

          <input
            className="w-full p-2 mb-3 bg-black border border-gray-600 rounded"
            value={editingGame.rating}
            onChange={(e) =>
              setEditingGame({ ...editingGame, rating: Number(e.target.value) })
            }
            placeholder="Rating"
          />

          <div className="flex gap-3 mt-4">

            <button
              onClick={async () => {
                await updateGame(editingGame.id, editingGame);
                setEditingGame(null);
                loadGames();
              }}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingGame(null)}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* GAME LIST */}
      <div className="mt-10 space-y-4">

        <h2 className="text-2xl font-semibold">
          Existing Games
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          games.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between bg-[#111827] p-4 rounded-xl border border-gray-700"
            >

              <div>
                <p className="font-bold">{game.name}</p>
                <p className="text-sm text-gray-400">
                  ₹{game.price} • ⭐ {game.rating}
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => setEditingGame(game)}
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(game.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}