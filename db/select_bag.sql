select *, bag.quantity as bag_quantity from bag
join products on products.product_id = bag.product_id
where user_id = $1;
