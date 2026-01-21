ALTER TABLE t_p11012073_souvenir_marketplace.orders 
ADD COLUMN customer_name VARCHAR(255),
ADD COLUMN customer_email VARCHAR(255),
ADD COLUMN customer_phone VARCHAR(50);

COMMENT ON COLUMN t_p11012073_souvenir_marketplace.orders.customer_name IS 'Имя покупателя для гостевых заказов';
COMMENT ON COLUMN t_p11012073_souvenir_marketplace.orders.customer_email IS 'Email покупателя';
COMMENT ON COLUMN t_p11012073_souvenir_marketplace.orders.customer_phone IS 'Телефон покупателя';
