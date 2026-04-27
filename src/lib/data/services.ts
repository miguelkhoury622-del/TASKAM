import { createClient } from "@/lib/supabase/client";

export async function getCategories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data;
}

export async function getServices(opts?: {
  category?: string;
  search?: string;
  featured?: boolean;
}) {
  const supabase = createClient();
  let query = supabase
    .from("services")
    .select("*, categories(name, emoji)")
    .eq("is_active", true);

  if (opts?.featured) query = query.eq("is_featured", true);
  if (opts?.search) query = query.ilike("name", `%${opts.search}%`);
  if (opts?.category && opts.category !== "all") {
    query = query.eq("categories.name", opts.category);
  }

  const { data, error } = await query.order("is_featured", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getServiceById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, categories(name, emoji)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}
