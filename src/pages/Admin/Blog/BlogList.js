import React, { useState, useEffect } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { notifyError, notifySuccess } from "../../../utils/notify";
import UseBlog from "../../../hooks/admin/useBlog";
import Spinner from "../../../components/spinner/spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../components";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import "./style.css";

const BlogList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const { UseBlogList, UseBlogDelete } = UseBlog();
  console.log("list::", list);
  const getAllBlogs = async () => {
    setLoading(true);
    const data = await UseBlogList();
    console.log("data", data);
    setList(data.blogs);
    if (data) {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    try {
      setLoading(true);
      const response = UseBlogDelete(id);
      setLoading(false);
      notifySuccess("blog delete successfully");
      setTimeout(() => {
        getAllBlogs();
      }, 500);
    } catch (error) {
      console.log("error::", error);
      notifyError(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);



  return (
    <>
      <div className="cust-container">
        <div className="cust-list-nav-bar">
          <Navigation lable={"Blogs"} />
          <div className="container-body" style={{ marginTop: 76 }}>
            <div className="product-list-body">
              <AdminSidebar></AdminSidebar>
              <div style={{ flex: 1, flexDirection: "column" }}>
                <div className="admin-container-body">
                  <div className="bloglist-header">
                    <h2>BlogList</h2>

                    {loading && (
                      <div className="loader">
                        <Spinner></Spinner>
                      </div>
                    )}
                    <div>
                      <button
                        className="addblog-btn"
                        onClick={() => navigate("/admin/sketchish-blog")}
                      >
                        Add Blog
                      </button>
                    </div>
                  </div>

                  <div className="bloglist-container">
                    {list?.map((blog, index) => {
                      return (
                        <div key={index} className="blogItem">
                          <div
                          className="blog_content"
                            onClick={() => {
                              navigate(
                                `/admin/sketchish-blog?blogId=${blog._id}`
                              );
                            }}
                          >

                             <div className="imagebox">
                                <img className="image_box_file" src={blog?.thumbnail} />
                             </div>

                            <div className="title_box">
                              <p className="blogItemTitle">{blog.title}</p>
                              <p className="blogItemDate">
                                PublishedOn : {blog.publishedOn}
                              </p>
                            </div>
                          </div>

                          <div
                            className="delete-btn"
                            onClick={() => handleDelete(blog._id)}
                          >
                            <RiDeleteBin4Line className="delete-icon" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
