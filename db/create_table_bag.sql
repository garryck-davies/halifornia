create table bag (
bag_id serial primary key,
product_id integer references products(product_id),
user_id integer references users(user_id),
quantity integer
)