import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from 'toastify-js'

export default function Card({ article, url, fetchArticle }) {
  const navigate = useNavigate()

  async function handleDelete(id){
    try {
      await axios.delete(`${url}/apis/news-portal/articles/${id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.access_token}`
        }
      })
      Toastify({
        text: "Success delete",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#00B29F",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold"
        }
    }).showToast();

    fetchArticle()
    } catch (error) {
      oastify({
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
            fontWeight: "bold"
        }
    }).showToast();
    }
  }

  function handleDetail(id) {
    navigate(`/detail/${id}`)
  }
  function handleEdit(id) {
    navigate(`/edit/${id}`)
}
  return (
    <>
        <div className="transform bg-gray-300 p-4 shadow-xl transition duration-300 hover:scale-105 md:max ">
          <figure className="ml-10">
          <img 
          className="h-32 my-4" 
          src={article.imgUrl} 
          alt="Article image"/>
          </figure>
          <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-4">
            {article.content}
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full" onClick={() => handleDetail(article.id)}>
            Detail
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-full" onClick={() => handleEdit(article.id)}>
            Edit
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-full" onClick={() => handleDelete(article.id)}>
            Delete
          </button>
        </div>
    </>
  );
}
// 