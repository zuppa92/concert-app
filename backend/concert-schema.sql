-- Schema for users table
CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Schema for concerts table
CREATE TABLE concerts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  venue VARCHAR(255) NOT NULL
);

-- Schema for applications table
CREATE TABLE applications (
  job_id INTEGER REFERENCES concerts(id) ON DELETE CASCADE,
  username VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE,
  PRIMARY KEY (job_id, username)
);