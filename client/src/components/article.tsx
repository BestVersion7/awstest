import React, { FC } from "react";
import axios from "axios";

interface Props {
    article_id: string | number | readonly string[] | undefined;
    article_date: string;
    article_title: string;
    article_post: string;
    loading: boolean;
    setLoading: any;
}

export const Article: FC<Props> = ({
    article_id,
    article_date,
    article_title,
    article_post,
    loading,
    setLoading,
}) => {
    const handleDelete = async (e: any) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/v1/article/${e.target.value}`);
            setLoading(!loading);
        } catch (err) {
            console.log(err);
            alert("fail delete");
        }
    };

    return (
        <p>
            <li>article id: {article_id}</li>
            <li>article date: {article_date}</li>
            <li>article title: {article_title}</li>
            <li>article post: {article_post}</li>
            <button value={article_id} onClick={handleDelete}>
                Delete {article_id}
            </button>
        </p>
    );
};
