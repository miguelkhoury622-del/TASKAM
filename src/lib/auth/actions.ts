"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(formData: {
  name: string;
  phone: string;
  email?: string;
  password: string;
  role: "customer" | "technician";
}) {
  const supabase = await createClient();

  const email = formData.email || `${formData.phone.replace(/\D/g, "")}@taskam.ng`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
      },
    },
  });

  if (error) return { error: error.message };

  if (data.user) {
    if (formData.role === "customer") {
      await supabase.from("users").insert({
        id: data.user.id,
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone,
      });
    } else {
      await supabase.from("technicians").insert({
        id: data.user.id,
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone,
        status: "pending",
      });
    }
  }

  return { success: true };
}

export async function signIn(formData: {
  identifier: string;
  password: string;
}) {
  const supabase = await createClient();

  const email = formData.identifier.includes("@")
    ? formData.identifier
    : `${formData.identifier.replace(/\D/g, "")}@taskam.ng`;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: formData.password,
  });

  if (error) return { error: error.message };

  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
