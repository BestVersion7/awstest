CREATE DATABASE ciaomien;

CREATE TABLE article (
    article_id SERIAL PRIMARY KEY,
    article_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    article_image VARCHAR(500),
    article_title VARCHAR(400) NOT NULL UNIQUE,
    article_image_alt VARCHAR(100) NOT NULL,
    article_post TEXT NOT NULL
);