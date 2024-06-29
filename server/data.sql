CREATE DATABASE Tradie

CREATE TABLE membership (
	member_id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(200) UNIQUE NOT NULL,
	member_since TIMESTAMP NOT NULL,
	last_visit TIMESTAMP
)
-- Inserting sample data into the membership table
INSERT INTO membership (username, password, email, member_since, last_visit) VALUES
('john_doe', 'password123', 'john.doe@example.com', '2021-01-15 10:00:00', '2024-06-10 15:20:00'),
('jane_smith', 'securePass!4', 'jane.smith@example.com', '2022-03-22 09:30:00', '2024-06-11 18:45:00'),
('alice_jones', 'alicePwd567', 'alice.jones@example.com', '2023-07-18 14:00:00', '2024-06-12 10:10:00'),
('bob_brown', 'b0bBr0wn98', 'bob.brown@example.com', '2021-11-25 16:45:00', '2024-06-09 19:00:00'),
('charlie_adams', 'charlie!@#', 'charlie.adams@example.com', '2022-12-05 12:20:00', '2024-06-10 08:55:00'),
('dave_clark', 'dave1234', 'dave.clark@example.com', '2023-05-30 11:15:00', '2024-06-10 21:30:00'),
('eve_wilson', 'evelyn2022', 'eve.wilson@example.com', '2021-02-19 13:40:00', '2024-06-12 07:25:00'),
('frank_white', 'frank!white', 'frank.white@example.com', '2020-10-10 08:10:00', '2024-06-11 12:00:00'),
('grace_hall', 'grace789', 'grace.hall@example.com', '2023-08-14 17:50:00', '2024-06-12 14:35:00'),
('hank_green', 'hank2021', 'hank.green@example.com', '2022-06-03 10:25:00', '2024-06-10 11:50:00');
