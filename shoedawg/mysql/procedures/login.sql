USE shoester;
DELIMITER $$
CREATE PROCEDURE Login(IN p_email VARCHAR(50), IN p_pw CHAR(60))
BEGIN
	DECLARE hashedp CHAR(40);
	IF (p_email NOT LIKE '^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9._-]*\\.[a-zA-Z]{2,4}$') THEN
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Format of provided email is invalid.';
	END IF; 
    SET hashedp = SHA1(p_pw);
    START TRANSACTION;
		INSERT INTO USER(email, name, pword) VALUES(p_email, p_name, hashedp);
        INSERT INTO CUSTOMER(email, address, phone_no) VALUES(p_email, NULL, NULL);
    COMMIT;
	
END$$

DELIMITER ;
