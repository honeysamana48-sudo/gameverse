import { supabase } from "./supabase";

export async function getDashboardStats() {
  const [gamesRes, ordersRes] = await Promise.all([
    supabase.from("games").select("id, price, original_price, is_deal, is_featured, stock, category"),
    supabase.from("orders").select("id, game_name, price, total_amount, status, is_fulfilled, created_at, customer_email, customer_name"),
  ]);

  const games = (gamesRes.data ?? []) as any[];
  const orders = (ordersRes.data ?? []) as any[];

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || o.price || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered" || o.status === "Delivered" || o.is_fulfilled).length;
  const processingOrders = orders.filter(o => o.status === "processing" || o.status === "Processing").length;
  const totalProducts = games.length;
  const lowStockProducts = games.filter(g => (g.stock ?? 100) < 10).length;
  const totalCustomers = new Set(orders.map(o => o.customer_email)).size;

  const now = new Date();
  const thisMonth = orders.filter(o => {
    const d = new Date(o.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyRevenue = thisMonth.reduce((sum, o) => sum + (o.total_amount || o.price || 0), 0);

  const last30Days = orders.filter(o => {
    const d = new Date(o.created_at);
    const diff = now.getTime() - d.getTime();
    return diff < 30 * 24 * 60 * 60 * 1000;
  });
  const recentOrders = last30Days.length;

  const categoryStats: Record<string, number> = {};
  const ordersByMonth: Record<string, { count: number; revenue: number }> = {};
  const topGames: Record<string, { count: number; revenue: number }> = {};

  orders.forEach(o => {
    const month = new Date(o.created_at).toLocaleString("default", { month: "short", year: "numeric" });
    if (!ordersByMonth[month]) ordersByMonth[month] = { count: 0, revenue: 0 };
    ordersByMonth[month].count++;
    ordersByMonth[month].revenue += (o.total_amount || o.price || 0);

    if (!topGames[o.game_name]) topGames[o.game_name] = { count: 0, revenue: 0 };
    topGames[o.game_name].count++;
    topGames[o.game_name].revenue += (o.total_amount || o.price || 0);
  });

  games.forEach(g => {
    if (!categoryStats[g.category]) categoryStats[g.category] = 0;
    categoryStats[g.category]++;
  });

  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return {
    totalRevenue,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    processingOrders,
    totalProducts,
    lowStockProducts,
    totalCustomers,
    monthlyRevenue,
    recentOrders,
    avgOrderValue,
    categoryStats,
    ordersByMonth,
    topGames,
  };
}
