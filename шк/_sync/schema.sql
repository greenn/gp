-- GP Classroom Live Sync: личная синхронизация одного учителя между устройствами.
-- Выполнить в SQL Editor своего проекта Supabase.
create table if not exists public.gp_classroom_sync (
  owner_id uuid not null references auth.users(id) on delete cascade,
  resource_id text not null check (resource_id in ('res-6-1-2627','trip-1026')),
  snapshot jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (owner_id, resource_id)
);

alter table public.gp_classroom_sync enable row level security;
revoke all on public.gp_classroom_sync from anon;
grant select, insert, update, delete on public.gp_classroom_sync to authenticated;

drop policy if exists "gp_class_sync_select_owner" on public.gp_classroom_sync;
create policy "gp_class_sync_select_owner" on public.gp_classroom_sync
 for select to authenticated using (owner_id = (select auth.uid()));
drop policy if exists "gp_class_sync_insert_owner" on public.gp_classroom_sync;
create policy "gp_class_sync_insert_owner" on public.gp_classroom_sync
 for insert to authenticated with check (owner_id = (select auth.uid()));
drop policy if exists "gp_class_sync_update_owner" on public.gp_classroom_sync;
create policy "gp_class_sync_update_owner" on public.gp_classroom_sync
 for update to authenticated using (owner_id = (select auth.uid()))
 with check (owner_id = (select auth.uid()));
drop policy if exists "gp_class_sync_delete_owner" on public.gp_classroom_sync;
create policy "gp_class_sync_delete_owner" on public.gp_classroom_sync
 for delete to authenticated using (owner_id = (select auth.uid()));

-- Включите таблицу gp_classroom_sync в публикацию supabase_realtime
-- через Dashboard → Database → Publications. Не добавляйте повторно.
