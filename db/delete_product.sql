delete from bag
where product_id = $1;

select * from bag
join products on products.product_id = bag.product_id
where user_id = $2;