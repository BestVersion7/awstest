require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// this should be in a different file
const { Pool } = require("pg");
const pool = new Pool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: 5432,
    database: process.env.database,
});

// const {Client} = require('pg')
// const client = new Client({
//     connectionString: 'electraverse.cq1xfqw46nig.us-east-1.rds.amazonaws.com',
//     ssl: {
//         rejectUnauthorized: false
//     }
// })

// client.connect()

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//     });
// }

app.use(express.static("client/build"))

app.get("/api/v1/article", async (req, res) => {
    try {
        const data = await pool.query(
            "SELECT * FROM article ORDER BY article_id DESC"
        );
        // console.log(data)
        res.json(data.rows);
    } catch (err) {
        // console.log(err);
        res.status(500).json("erro");
    }
});
app.post("/api/v1/article", async (req, res) => {
    try {
        const {
            article_image,
            article_title,
            article_image_alt,
            article_post,
        } = req.body;
        const data = await pool.query(
            "INSERT INTO article(article_image, article_title, article_image_alt, article_post) VALUES($1, $2, $3, $4) RETURNING *;",
            [article_image, article_title, article_image_alt, article_post]
        );
        // console.log(data.rows)
        res.json(data.rows);
    } catch (err) {
        // console.log(err);
        res.status(500).json("erro");
    }
});
app.delete("/api/v1/article/:articleId", async (req, res) => {
    try {
        const { articleId } = req.params;
        const data = await pool.query(
            "DELETE FROM article WHERE article_id = $1 RETURNING *;",
            [articleId]
        );
        // console.log(data.rows)
        res.json(data.rows);
    } catch (err) {
        // console.log(err);
        res.status(500).json("erro");
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running on port ${port}`));
