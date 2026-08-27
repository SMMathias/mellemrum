import { supabase } from "./supabaseClient";

// Events

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select()
    .order("date", { ascending: true });

  if (error) throw error;

  return data;
}

export async function getEventById(eventId) {
  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("id", eventId)
    .single();

  if (error) throw error;

  return data;
}

// tilmeldinger

export async function getRegistrations() {
  const { data, error } = await supabase
    .from("registrations")
    .select()
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data;
}
