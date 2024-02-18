"use client";
import React from "react";
import { useState, useEffect } from "react";
import Styles from "./style.module.css";
import { useRouter } from 'next/navigation';
import { images } from "../../assets/images";
import Image from "next/image";
import { formatDate } from "@/utils/dateFormate";

const SmallBlogCard = ({ heading, blogId, date, img }) => {
  const router = useRouter();
  return (
    <div
      className={Styles.blog_card_small}
      onClick={() => {
        router.push(`/blogs/${blogId}`);
      }}
    >
      <div className={Styles.thumbnail_small}>
        <Image alt="decoration" src={img} className={Styles.img} width={100} height={100} />
      </div>
      <div className={Styles.text_cont}>
        <p className={Styles.date}>{date}</p>
        <p className={Styles.heading}>{heading}</p>
      </div>
    </div>
  );
};

const BlogsList = () => {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8002/services/blogs/list/')

      .then((res) => res.json())
      .then((data) => {
        console.log('data::',data.data.blogs);
        setLoading(false)
        setData(data?.data?.blogs);
      })
  }, []);

  return (
    <div className={Styles.smallcards_cont}>
      {data &&
        data?.map((blog) => {
          return (
            <SmallBlogCard
              key={blog._id}
              heading={blog.title}
              blogId={blog._id}
              date={formatDate(blog?.publishedOn)}
              img={blog.thumbnail ? blog.thumbnail : images.blog_1 }
            />
          );
        })}
      
    </div>
  );
};

export default BlogsList;
