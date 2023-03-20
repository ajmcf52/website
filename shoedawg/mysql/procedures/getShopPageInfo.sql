use shoester;
DELIMITER $$
create procedure getShopPageInfo(in cookieValue char(18) , out connectionType enum('guest','user'), out uName varchar(100), out itemCount smallint unsigned) 
begin
	select count(*) from SHOES s where s.cart_id=cookieValue
    into itemCount;
    
    select connection_type, name
    from USER U join (select * from context c where c.session_id=cookieValue) T1 on T1.session_id=U.token
	into connectionType, uName;
end