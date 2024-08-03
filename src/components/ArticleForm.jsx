import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function ArticlesForm({ url, handleSubmit, article, nameProp }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (article) {
      setName(article.name);
      setTitle(article.title);
      setContent(article.content);
      setImgUrl(article.imgUrl);
      setRating(article.rating);
      setCategoryId(article.categoryId);
    }
  }, [article]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/news-portal/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="bg-card p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Article yourself
        </h2>
        <form
          onSubmit={(e) =>
            handleSubmit(e, name, title, content, imgUrl, rating, categoryId)
          }
        >
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" for="name">
              Name:
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" for="title">
              Title:
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
              type="text"
              id="title"
              placeholder="Enter the title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" for="content">
              Content:
            </label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
              id="content"
              placeholder="Enter content"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" for="img-url">
              Iamge (URL):
            </label>
            <input
              onChange={(e) => setImgUrl(e.target.value)}
              className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
              type="text"
              id="img-url"
              placeholder="Enter image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" for="rating">
              Rating:
            </label>
            <input
              onChange={(e) => setRating(e.target.value)}
              className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
              type="number"
              id="rating"
              placeholder="Enter rating"
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" for="category">
              Category:
            </label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
              id="category"
            >
              {categories.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg p-2 w-full"
            type="submit"
          >
            {nameProp}
          </button>
        </form>
      </div>
    </>
  );
}
