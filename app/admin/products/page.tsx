"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Plus, Search, Edit, Trash2, Copy, Eye, EyeOff, ChevronDown, Upload, Download, MoreHorizontal, Star, Tag, DollarSign, Layers } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import AdminModal from "@/components/admin/AdminModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { AdminTable, TableRow, TableCell } from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import SearchFilter from "@/components/admin/SearchFilter";
import { SkeletonTable } from "@/components/admin/Skeleton";
import { fetchGames, updateGame, deleteGame, duplicateGame, bulkDeleteGames, type GameRow } from "@/lib/adminGames";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <ProductsContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function ProductsContent() {
  const toast = useToast();
  const [games, setGames] = useState<GameRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<GameRow | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [editGame, setEditGame] = useState<GameRow | null>(null);
  const [editForm, setEditForm] = useState<Partial<GameRow>>({});

  const loadGames = async () => {
    try { setGames(await fetchGames()); } catch { toast("Failed to load games", "error"); }
    setLoading(false);
  };
  useEffect(() => { loadGames(); }, []);

  const categories = useMemo(() => [...new Set(games.map(g => g.category))], [games]);

  const filtered = useMemo(() => {
    return games.filter(g => {
      const matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !categoryFilter || g.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [games, search, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteGame(deleteTarget.id);
    setGames(prev => prev.filter(g => g.id !== deleteTarget.id));
    toast(`"${deleteTarget.name}" deleted`, "success");
    setDeleteTarget(null);
  };

  const handleDuplicate = async (g: GameRow) => {
    await duplicateGame(g.id);
    await loadGames();
    toast(`"${g.name}" duplicated`, "success");
  };

  const handleBulkDelete = async () => {
    await bulkDeleteGames(selectedIds);
    setGames(prev => prev.filter(g => !selectedIds.includes(g.id)));
    toast(`${selectedIds.length} products deleted`, "success");
    setSelectedIds([]);
    setBulkDeleteOpen(false);
  };

  const handleEdit = (g: GameRow) => {
    setEditGame(g);
    setEditForm({ name: g.name, price: g.price, original_price: g.original_price, discount_percent: g.discount_percent, stock: g.stock ?? 100, is_deal: g.is_deal, is_featured: g.is_featured, category: g.category, platform: g.platform, rating: g.rating });
  };

  const handleEditSave = async () => {
    if (!editGame) return;
    await updateGame(editGame.id, editForm);
    setGames(prev => prev.map(g => g.id === editGame.id ? { ...g, ...editForm } : g));
    toast("Product updated", "success");
    setEditGame(null);
  };

  const toggleAll = () => {
    if (selectedIds.length === paginated.length) setSelectedIds([]);
    else setSelectedIds(paginated.map(g => g.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Package className="w-8 h-8 text-purple-400" /> Products</h1>
          <p className="text-gray-400 mt-1">{games.length} total products</p>
        </div>
      </div>

      <SearchFilter
        searchValue={search}
        onSearchChange={v => { setSearch(v); setCurrentPage(1); }}
        searchPlaceholder="Search products..."
        filters={[{ label: "Category", value: categoryFilter, options: [{ label: "All Categories", value: "" }, ...categories.map(c => ({ label: c, value: c }))] }]}
        onFilterChange={(k, v) => { setCategoryFilter(v); setCurrentPage(1); }}
      />

      {selectedIds.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-sm text-cyan-400">{selectedIds.length} selected</span>
          <button onClick={() => setBulkDeleteOpen(true)} className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30">Delete Selected</button>
          <button onClick={() => setSelectedIds([])} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10">Clear</button>
        </motion.div>
      )}

      {loading ? <SkeletonTable rows={8} cols={7} /> : (
        <>
          <AdminTable headers={["", "Product", "Category", "Price", "Stock", "Status", "Actions"]}>
            {paginated.map(g => (
              <TableRow key={g.id} onClick={() => handleEdit(g)}>
                <TableCell onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={selectedIds.includes(g.id)} onChange={() => setSelectedIds(prev => prev.includes(g.id) ? prev.filter(id => id !== g.id) : [...prev, g.id])} className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/25" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                      {g.image && <img src={g.image} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{g.name}</p>
                      <p className="text-gray-500 text-xs">{g.platform}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-lg">{g.category}</span></TableCell>
                <TableCell>
                  <div>
                    <span className="text-white font-medium">₹{g.price}</span>
                    {g.original_price > g.price && <span className="text-gray-500 text-xs line-through ml-2">₹{g.original_price}</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-sm ${(g.stock ?? 100) < 10 ? "text-red-400" : "text-gray-300"}`}>{g.stock ?? 100}</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {g.is_deal && <StatusBadge status="Deal" />}
                    {g.is_featured && <StatusBadge status="Featured" />}
                  </div>
                </TableCell>
                <TableCell onClick={e => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDuplicate(g)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400" title="Duplicate"><Copy className="w-4 h-4" /></button>
                    <button onClick={() => handleEdit(g)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-amber-400" title="Edit"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteTarget(g)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow><TableCell><span className="text-gray-500 col-span-7 block text-center py-8">No products found</span></TableCell></TableRow>
            )}
          </AdminTable>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      {/* Edit Modal */}
      <AdminModal isOpen={!!editGame} onClose={() => setEditGame(null)} title="Edit Product" maxWidth="max-w-xl">
        {editGame && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input value={editForm.name || ""} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Price (₹)</label>
                <input type="number" value={editForm.price || 0} onChange={e => setEditForm(p => ({ ...p, price: Number(e.target.value) }))} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Original Price (₹)</label>
                <input type="number" value={editForm.original_price || 0} onChange={e => setEditForm(p => ({ ...p, original_price: Number(e.target.value) }))} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Stock</label>
                <input type="number" value={editForm.stock ?? 100} onChange={e => setEditForm(p => ({ ...p, stock: Number(e.target.value) }))} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Rating</label>
                <input type="number" step="0.1" min="0" max="5" value={editForm.rating || 0} onChange={e => setEditForm(p => ({ ...p, rating: Number(e.target.value) }))} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={editForm.is_deal || false} onChange={e => setEditForm(p => ({ ...p, is_deal: e.target.checked }))} className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500" /> Deal of the Day
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={editForm.is_featured || false} onChange={e => setEditForm(p => ({ ...p, is_featured: e.target.checked }))} className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500" /> Featured
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button onClick={() => setEditGame(null)} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-sm transition-colors">Cancel</button>
              <button onClick={handleEditSave} className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">Save Changes</button>
            </div>
          </div>
        )}
      </AdminModal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Product" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} />
      <ConfirmDialog isOpen={bulkDeleteOpen} onClose={() => setBulkDeleteOpen(false)} onConfirm={handleBulkDelete} title="Bulk Delete" message={`Delete ${selectedIds.length} selected products? This cannot be undone.`} />
    </div>
  );
}
