import { images } from "@/assets/images";
import { Button, TiptapEditor } from "@/components";
import {
  BlogSection,
  FooterSection
} from "@/sections";
import CommonStyles from "@/utils/commonStyles.module.css";
import Image from "next/image";
import Link from "next/link";
import Styles from "./style.module.css";
import { formatDate } from "@/utils/dateFormate";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = await fetch("http://localhost:8002/services/blogs/list/").then(
    (res) => res.json()
  );

  // console.log("slugs::", slugs.data.blogs);
  return slugs.data.blogs.map((blog) => ({
    slug: blog._id,
  }));
}

async function getData(id) {
  const res = await fetch(`http://localhost:8002/services/blogs/detail/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
  const { slug } = params;
  console.log("slug::", slug);

  const data = await getData(slug);

  let htmlData = `<h2>Crafting Connections</h2><h3>A Step-by-Step Guide to Building Your Own Social Media Website</h3><p>In a world where connections are the currency of the digital age, building your own social media website can be a thrilling venture. This step-by-step guide is your ticket to creating a platform where communities thrive, conversations flourish, and users find a space to express, connect, and engage. Let's embark on this journey together, turning your vision into a vibrant digital reality.</p><p></p><h4>Step 1: Define Your Purpose</h4><p>Every successful social media platform starts with a clear purpose. Are you creating a space for professionals, artists, hobbyists, or a mix of communities? Define your niche, target audience, and the unique value your platform will offer.</p><p></p><h4>Step 2: Choose Your Tech Stack</h4><ul><li><p>Technology Selection: Choose the right technology for your project, considering factors such as robustness, flexibility, and alignment with platform goals</p></li><li><p>Framework Consideration: Evaluate frameworks like Django, Ruby on Rails, or JavaScript with Node.js based on their suitability for your project's requirements and objectives.</p></li><li><p>Alignment with Platform Goals: Ensure that the chosen technology aligns seamlessly with the goals and objectives of your platform, promoting overall success and efficiency.</p></li><li><p>Alignment with Platform Goals: Ensure that the chosen technology aligns seamlessly with the goals and objectives of your platform, promoting overall success and efficiency.</p></li></ul>`;

  function createMarkup(html) {
    return { __html: html };
  }

  return (
    <>
      <section
        className={`${Styles.header_wraper} ${CommonStyles.body_padding}`}
      >
        <div className={`${Styles.sec_cont}`}>
          <div className={Styles.headerImage}>
            <Image
              alt="decoration"
              src={
                data?.data?.thumbnail ? data?.data?.thumbnail : images.blog_1
              }
              className={Styles.img}
              height={250}
              width={300}
            />
          </div>
          <div className={Styles.blogHeaderText}>
            <div className={Styles.publishedOn}>
              <p>{formatDate(data.data.publishedOn)}</p>
            </div>
            <div className={Styles.title}>
              <h1>{data?.data?.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className={CommonStyles.body_padding}>
        <div className={Styles.blogContainer}>
          <div style={{width:"65%"}}>
            <div
              className={Styles.html_cont}
              style={{width:"100%"}}
              dangerouslySetInnerHTML={createMarkup(data?.data?.content)}
            ></div>
          </div>
          <div className={Styles.rgt_sec}>
            <div className={Styles.blocks}>
              <h4>Related articles</h4>
              <div className={Styles.related_blogs_links_cont}>
                <div className={Styles.related_blogs_link}>
                  <Link href={"#"}>
                    A Guide to Building Trust and Safety in Online Communities
                  </Link>
                </div>
                <div className={Styles.related_blogs_link}>
                  <Link href={"#"}>
                    A Guide to Building Trust and Safety in Online Communities
                  </Link>
                </div>
                <div className={Styles.related_blogs_link}>
                  <Link href={"#"}>
                    A Guide to Building Trust and Safety in Online Communities
                  </Link>
                </div>
              </div>
            </div>
            <div className={`${Styles.blocks} ${Styles.newsletter_sub}`}>
              <p className={Styles.newsletter_head}>
                Sign up to our newsletter and stay hip.
              </p>
              <div className={`${Styles.email_inp_cont}`}>
                <input type="email" placeholder="Enter email" />
                <button className={Styles.submit_btn}>
                  <svg
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 8H19.5M19.5 8L12 0.5M19.5 8L12 15.5"
                      stroke="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`${Styles.blocks} ${Styles.newsletter_sub}`}>
              <p className={Styles.newsletter_head}>SHARE</p>
              <div className={Styles.social_btns_cont}>
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1929_12146)">
                      <path
                        d="M23.6465 1.4834H28.2324L18.2134 12.9344L30 28.5167H20.7712L13.5429 19.0662L5.27208 28.5167H0.683349L11.3996 16.2686L0.0927734 1.4834H9.55584L16.0896 10.1216L23.6465 1.4834ZM22.0369 25.7718H24.578L8.17502 4.08415H5.44815L22.0369 25.7718Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1929_12146">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
                <Button background={"#0077B5"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1929_12151)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M27.7805 0H2.21341C0.992256 0 0 0.968925 0 2.16341V27.8366C0 29.0311 0.992256 30.0011 2.21341 30.0011H27.7805C29.0044 30.0011 30 29.0311 30 27.8366V2.16341C30 0.968925 29.0044 0 27.7805 0ZM7.15063 4.05518C8.5475 4.05518 9.68263 5.19027 9.68263 6.58938C9.68263 7.98681 8.5475 9.12187 7.15063 9.12187C5.75096 9.12187 4.61914 7.98681 4.61914 6.58938C4.61914 5.19027 5.75096 4.05518 7.15063 4.05518ZM4.96719 25.0987H9.33682V11.0424H4.96719V25.0987ZM12.0752 11.0419H16.2654V12.964H16.3254C16.9084 11.8584 18.3338 10.6934 20.4588 10.6934C24.8824 10.6934 25.699 13.6039 25.699 17.3888V25.0982H21.3321V18.262C21.3321 16.6317 21.3043 14.535 19.0619 14.535C16.7884 14.535 16.4421 16.312 16.4421 18.1454V25.0982H12.0752V11.0419Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1929_12151">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
                <Button background={"#316FF6"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1929_12162)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.024 30H1.65577C0.741044 30 0 29.2585 0 28.3441V1.65576C0 0.741156 0.741163 0 1.65577 0H28.3444C29.2588 0 30 0.741156 30 1.65576V28.3441C30 29.2586 29.2586 30 28.3444 30H20.6996V18.3824H24.5991L25.183 13.8548H20.6996V10.9641C20.6996 9.65331 21.0636 8.76 22.9433 8.76L25.3408 8.75894V4.70943C24.9262 4.65426 23.503 4.53098 21.8472 4.53098C18.3905 4.53098 16.024 6.64094 16.024 10.5157V13.8548H12.1144V18.3824H16.024V30Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1929_12162">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlogSection />
      <FooterSection background={"#F7EDCF"} />
    </>
  );
  // ...
}
