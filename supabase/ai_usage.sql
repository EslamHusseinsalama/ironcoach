-- كوتش الحديد — حد يومي لاستخدام الذكاء الاصطناعي لكل مستخدم
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users on delete cascade,
  day date not null default current_date,
  count int not null default 0,
  primary key (user_id, day)
);
alter table public.ai_usage enable row level security;

create or replace function public.ai_bump(p_user uuid, p_limit int)
returns int language plpgsql security definer set search_path = public as $$
declare c int;
begin
  insert into public.ai_usage (user_id, day, count) values (p_user, current_date, 1)
  on conflict (user_id, day) do update set count = public.ai_usage.count + 1
  returning count into c;
  if c > p_limit then return -1; end if;
  return c;
end; $$;

revoke execute on function public.ai_bump(uuid, int) from public, anon, authenticated;
grant execute on function public.ai_bump(uuid, int) to service_role;
