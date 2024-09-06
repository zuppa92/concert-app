-- Seed data for users
INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES
('admin', '$2b$12$4.I0RZdKq3d4qXb5oQ1wxOMa8PQ8gOG2zUht/gf6P1l6/OIwMJ64W', 'Admin', 'User', 'admin@concertapp.com', TRUE),
('user1', '$2b$12$4.I0RZdKq3d4qXb5oQ1wxOMa8PQ8gOG2zUht/gf6P1l6/OIwMJ64W', 'User', 'One', 'user1@concertapp.com', FALSE);

-- Seed data for concerts
INSERT INTO concerts (title, artist, date, venue)
VALUES
('Live Concert 1', 'Artist 1', '2024-08-01', 'Venue 1'),
('Live Concert 2', 'Artist 2', '2024-08-15', 'Venue 2');

-- Seed data for applications
INSERT INTO applications (job_id, username)
VALUES
(1, 'user1'),
(2, 'user1');