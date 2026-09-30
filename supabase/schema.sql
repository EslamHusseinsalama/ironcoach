-- كوتش الحديد — جداول السيرفر (Supabase)
-- الصق الملف ده كله في SQL Editor ودوس Run مرة واحدة.

-- 1) أسماء المستخدمين
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_.]{3,20}$'),
  created_at timestamptz not null default now()
);

-- 2) بيانات كل مستخدم (البروفايل، قياسات InBody، البرنامج، سجل التمرين)
create table if not exists public.app_state (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 3) كل مستخدم يشوف ويعدّل بياناته هو بس
alter table public.profiles enable row level security;
alter table public.app_state enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "read own state" on public.app_state;
create policy "read own state" on public.app_state for select using (auth.uid() = user_id);
drop policy if exists "insert own state" on public.app_state;
create policy "insert own state" on public.app_state for insert with check (auth.uid() = user_id);
drop policy if exists "update own state" on public.app_state;
create policy "update own state" on public.app_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "delete own state" on public.app_state;
create policy "delete own state" on public.app_state for delete using (auth.uid() = user_id);

-- 4) أول ما حد يسجّل، اسمه يتسجّل في profiles
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (new.id, lower(coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))));
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
