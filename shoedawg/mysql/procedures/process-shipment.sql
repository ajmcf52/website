use shoester;
DELIMITER $$
create procedure ProcessShipment(in shipping_number mediumint)
BEGIN
declare right_now date;
set right_now = curdate();
insert into SHIPMENT(po_number, date_received) values(shipping_number, right_now);
insert into STOCK(sku, quantity, price, po_num) values('testsku', 100, 49.99, po_number);
insert into SHOES(serial_no, sku, status, price, cart_id) values('test-serial', 'testsku', 'held', 49.99, 'test-cart-id');
END$$
DELIMITER ;