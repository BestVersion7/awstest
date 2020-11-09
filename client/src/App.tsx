import React, { FC, useState, useEffect } from "react";
import { Article } from "./components/article";
import axios from "axios";

const App: FC<{}> = () => {
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [articleTitle, setArticleTitle] = useState("bob");
    const [articleImage, setArticleImage] = useState("bill");
    const [articleImageAlt, setArticleImageAlt] = useState("will");
    const [articlePost, setArticlePost] = useState("hill");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("/api/v1/article", {
                article_title: articleTitle,
                article_image: articleImage,
                article_image_alt: articleImageAlt,
                article_post: articlePost,
            });
            // console.log(data);
            setLoading(!loading);
        } catch (err) {
            alert("fail post");
        }
    };


    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const { data } = await axios.get("/api/v1/article");
                setArticleData(data);
            } catch (err) {
                console.log(err);
            }
        };
        console.log(fetchArticleData);
        fetchArticleData();
    }, [loading]);
    return (
        <main>
            <p>World Heavy Weight Championship</p>
            <form onSubmit={handleSubmit}>
                <label>article Title</label>
                <textarea
                    onChange={(e) => setArticleTitle(e.target.value)}
                    cols={30}
                    rows={2}
                    value={articleTitle}
                />

                <label>article image</label>
                <textarea
                    onChange={(e) => setArticleImage(e.target.value)}
                    cols={30}
                    rows={2}
                    value={articleImage}
                />
                <label>article image alt</label>
                <textarea
                    onChange={(e) => setArticleImageAlt(e.target.value)}
                    cols={30}
                    rows={2}
                    value={articleImageAlt}
                />
                <label>article post</label>
                <textarea
                    onChange={(e) => setArticlePost(e.target.value)}
                    cols={30}
                    rows={2}
                    value={articlePost}
                />

                <button>Submit</button>
            </form>
            {articleData.map(
                ({ article_id, article_date, article_title, article_post }) => {
                    return (
                        <Article
                            key={article_id}
                            article_id={article_id}
                            article_date={article_date}
                            article_title={article_title}
                            article_post={article_post}
                            loading={loading}
                            setLoading={setLoading}  
                        />
                    );
                }
            )}
        </main>
    );
};

export default App;
