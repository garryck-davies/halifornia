-- create table users (
-- user_id serial primary key,
-- user_name text,
-- user_hash varchar(200)
-- )


insert into users(user_name, user_hash)
values($1, $2)
returning *;