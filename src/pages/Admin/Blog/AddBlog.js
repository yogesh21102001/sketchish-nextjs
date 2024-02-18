import React, { useState, useEffect } from "react";
import Spinner from "../../../components/spinner/spinner";
import { notifySuccess } from "../../../utils/notify";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import UseBlog from "../../../hooks/admin/useBlog";
import MultipleValueTextInput from "react-multivalue-text-input";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiEmotionLine,
  RiImageAddFill,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
  RiListOrdered,
  RiListUnordered,
  RiCodeBoxLine,
  RiLink,
  RiLinkUnlink,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiFormatClear,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from "react-icons/ri";
import Typography from "@tiptap/extension-code-block";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import "./style.css";
// import { EditorProvider, FloatingMenu,  BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
import Tiptap from "../components/TipTap/TipTap";
import { formatDate, formatDateByMonth } from "../../../utils/helpers";

const AddBlog = () => {
  const { UseBlogDetail } = UseBlog();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [labelsArray, setLabelsArray] = useState();
  const [titleVal, setTitleVal] = useState();
  const [tags, setTags] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogData, setBlogData] = useState();
  const [content, setContent] = useState();
  const [thumbnail, setThumbnail] = useState();

  useEffect(() => {
    if (editor) {
      editor.chain().setContent(blogData).run()
    }
  }, [blogData])


  // editor extensions
  const extensions = [
    StarterKit.configure({
      ...(false && { codeBlock: false }),
    }),
    Image.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: "my-custom-class",
      },
    }),
    ImageResize,
    TextAlign.configure({
      types: ["heading", "paragraph", "image"],
    }),
  ];

  // editor initialisation
  const editor = useEditor({
    content: blogData,
    extensions,
    editable: true,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file::", file);
    setThumbnail(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const getBlogDetails = async (id) => {
    try {
      setLoading(true);
      const data = await UseBlogDetail(id);
      setSelectedImage(data?.thumbnail);
      setThumbnail(data?.thumbnail);
      setTags(data.labels);
      setTitleVal(data.title);
      setBlogData(data.content);
      setContent(data);
      setLoading(false);

    } catch (error) {
      console.log("error::", error);
    }
  };

  useEffect(() => {
    const blogId = searchParams.get("blogId");

    if (blogId) {
      getBlogDetails(blogId);
    }
  }, []);

  const [selectedImage, setSelectedImage] = useState();


  const removeTags = (indexToRemove) => {
    setTags([...tags?.filter((_, index) => index !== indexToRemove)]);
  };

  const selectedTags = (tags) => {
    console.log(tags);
  };

  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      selectedTags([...tags, event.target.value]);
      event.target.value = "";
      setIsExpanded(true);
    }
  };

  const { UseAddBlog, UseBlogupdate } = UseBlog();


  console.log('selectedImage::', selectedImage);

  const handleSubmit = async (key) => {
    const htmlData = editor.getHTML();
    setBlogData(htmlData);

    console.log("thumbnail ::", thumbnail);

    const formData = new FormData();
    formData.append("title", titleVal);
    formData.append("content", htmlData);
    formData.append("labels", JSON.stringify(tags));
    formData.append("publishedOn", new Date().toLocaleDateString());
    formData.append("thumbnail", thumbnail)


    if (key == "Update") {
      formData.append("blogId", searchParams.get("blogId"));

      try {
        setLoading(true);
        const response = await UseBlogupdate(formData);

        setLoading(false);
        notifySuccess("Blog updated successfully");
        navigate("/admin/blogs");
      } catch (error) {
        setLoading(false);
        console.log("error::", error);
      }
    } else {
      try {
        setLoading(true);
        const response = await UseAddBlog(formData);

        setLoading(false);
        notifySuccess("Blog created successfully");
        navigate("/admin/blogs");
      } catch (error) {
        setLoading(false);
        console.log("error::", error);
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };

    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleIconClick = () => {
    // Trigger the file input when the icon is clicked
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <div className="cust-container">
        <div className="cust-list-nav-bar">
          <Navigation lable={"Blogs"} />
          <div className="container-body" style={{ marginTop: 76 }}>
            <div className="product-list-body">
              <div style={{ flex: 1, flexDirection: "column" }}>
                <div className="container-body-editor">
                  <div className="main-editor">
                    {/* blog title */}
                    <div className="title-container">
                      <input
                        type="text"
                        className="title-input"
                        placeholder="Title..."
                        value={titleVal}
                        onChange={(e) => setTitleVal(e.target.value)}
                      />
                    </div>
                    {/* blog toolbar */}
                    <div className="WhiteCard">
                      <div className="Toolbar">
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleBold().run()
                          }
                        >
                          <RiBold />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                          }
                        >
                          <RiItalic />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                          }
                        >
                          <RiStrikethrough />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleCode().run()
                          }
                        >
                          <RiCodeSSlashLine />
                        </div>
                        <div className="divider"></div>

                        <div className="divider"></div>
                        {/* <div className="icon" onClick={addImage}>
                          <RiImageAddFill />
                        </div> */}
                        <div className="icon">
                          <input
                            type="file"
                            id="fileInput"
                            className="hidden-input"
                            onChange={handleFileChange}
                            accept="image/*" // Set accepted file types (in this case, only images)
                          />
                          <div
                            className="icon-container"
                            onClick={handleIconClick}
                          >
                            <RiImageAddFill />
                          </div>
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 1 })
                              .run()
                          }
                        >
                          <RiH1 />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 2 })
                              .run()
                          }
                        >
                          <RiH2 />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 3 })
                              .run()
                          }
                        >
                          <RiH3 />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 4 })
                              .run()
                          }
                        >
                          <RiH4 />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 5 })
                              .run()
                          }
                        >
                          <RiH5 />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 6 })
                              .run()
                          }
                        >
                          <RiH6 />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().setParagraph().run()
                          }
                        >
                          <RiParagraph />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                          }
                        >
                          <RiListOrdered />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                          }
                        >
                          <RiListUnordered />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleCodeBlock().run()
                          }
                        >
                          <RiCodeBoxLine />
                        </div>
                        <div className="divider"></div>

                        <div className="divider"></div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                          }
                        >
                          <RiDoubleQuotesL />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().setHorizontalRule().run()
                          }
                        >
                          <RiSeparator />
                        </div>
                        <div className="divider"></div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor.chain().focus().setHardBreak().run()
                          }
                        >
                          <RiTextWrap />
                        </div>
                        <div
                          className="icon"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .unsetAllMarks()
                              .clearNodes()
                              .run()
                          }
                        >
                          <RiFormatClear />
                        </div>
                        <div className="divider"></div>
                        <div
                          className="icon"
                          onClick={() => editor.chain().focus().undo().run()}
                        >
                          <RiArrowGoBackLine />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                          }
                        // className={
                        //   editor.isActive({ textAlign: "left" })
                        //     ? "is-active"
                        //     : ""
                        // }
                        >
                          left
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                          }
                        // className={
                        //   editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                        // }
                        >
                          center
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                          }
                        // className={
                        //   editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                        // }
                        >
                          right
                        </button>

                        <div
                          className="icon"
                          onClick={() => editor.chain().focus().redo().run()}
                        >
                          <RiArrowGoForwardLine />
                        </div>
                      </div>

                      {loading ? (
                        <div className="loader">
                          <Spinner></Spinner>
                        </div>
                      ) : (
                        <EditorContent className="editor" editor={editor} />
                      )}
                    </div>
                  </div>
                  <div className="editor-sidebar">
                    <p className="setings-label">Post Settings</p>
                    <div className="settings-container">
                      {searchParams.get("blogId") ? (
                        <button
                          className="savebtn"
                          onClick={() => handleSubmit("Update")}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="savebtn"
                          onClick={() => handleSubmit("Save")}
                        >
                          Save
                        </button>
                      )}
                      <div className="settings-container" style={{ paddingLeft: 0 }}>
                        <div>
                          <label className="label_blog" htmlFor="image-input" style={{ cursor: 'pointer' }}>
                            <RiImageAddFill size={30} />
                            <p>Add Thumbnail</p>
                          </label>
                          <input
                            type="file"
                            id="image-input"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                          />

                          {/* {selectedImage || searchParams.get("blogId") && ( */}
                          {selectedImage && <div className="image_preview">
                            <img className="img_blog" src={selectedImage} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }} />
                          </div>}

                          {/* )} */}
                        </div>
                        <div className="publishedDate">
                          <p>PublishedOn:</p>
                          <p >
                            {formatDateByMonth(new Date().toLocaleDateString())}{" "}
                          </p>
                        </div>
                        <div className="labels">
                          <p>Labels</p>
                          <div className="tags-input">
                            <input
                              className="tag-input-box"
                              type="text"
                              onKeyUp={(event) =>
                                event.key === "Enter" ? addTags(event) : null
                              }
                              placeholder="Press enter to add tags"
                            />
                          </div>
                          <ul id="tags">
                            {tags.map((tag, index) => (
                              <li key={index} className="tag">
                                <span className="tag-title">{tag}</span>
                                <span
                                  className="tag-close-icon"
                                  onClick={() => removeTags(index)}
                                >
                                  x
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div></div>
                    </div>
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

export default AddBlog;
