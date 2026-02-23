create extension if not exists pgcrypto;

create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  type text not null check (type in ('lunch', 'dinner')),
  created_at timestamptz not null default now()
);

create table if not exists public.weekly_plan (
  id uuid primary key default gen_random_uuid(),
  day text not null check (day in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  slot text not null check (slot in ('lunch', 'dinner')),
  meal_id uuid not null references public.meals(id) on delete cascade,
  updated_at timestamptz not null default now(),
  unique (day, slot)
);

