"use client";
import React from "react";
import { useState, useEffect } from "react";
import Styles from "./style.module.css";
import { useRouter } from 'next/navigation';
import { images } from "../../assets/images";
import Image from "next/image";
import { formatDate } from "@/utils/dateFormate";
import Link from "next/link";

const SmallBlogCard = ({ heading, blogId, date, img, slug }) => {
  const router = useRouter();
  const options = {id : blogId}
  return (
    <Link className={Styles.blog_card_small} href={`/blogs/${slug}`}>
      <div className={Styles.thumbnail_small}>
        <Image alt="decoration" src={img} className={Styles.img} width={100} height={100} />
      </div>
      <div className={Styles.text_cont}>
        <p className={Styles.date}>{date}</p>
        <p className={Styles.heading}>{heading}</p>
      </div>
    </Link>
  );
};

const BlogsList = () => {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const BaseUrl = process.env.NEXT_BASE_URL;
    console.log(">>>>>", BaseUrl);
    fetch(`${BaseUrl}services/blogs/list/`)
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
            <>
            <SmallBlogCard
              key={blog._id}
              heading={blog.title}
              blogId={blog._id}
              date={formatDate(blog?.publishedOn)}
              img={blog.thumbnail ? blog.thumbnail : images.blog_1 }
              slug={blog.slug}
            />
            </>
          );
        })}
      
    </div>
  );
};

export default BlogsList;
