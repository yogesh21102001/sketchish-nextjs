'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TiptapEditor = ({html}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Code.configure()
    ],
    content: `<h2>Crafting Connections</h2><h3>A Step-by-Step Guide to Building Your Own Social Media Website</h3><p>In a world where connections are the currency of the digital age, building your own social media website can be a thrilling venture. This step-by-step guide is your ticket to creating a platform where communities thrive, conversations flourish, and users find a space to express, connect, and engage. Let's embark on this journey together, turning your vision into a vibrant digital reality.</p><p></p><h4>Step 1: Define Your Purpose</h4><p>Every successful social media platform starts with a clear purpose. Are you creating a space for professionals, artists, hobbyists, or a mix of communities? Define your niche, target audience, and the unique value your platform will offer.</p><p></p><h4>Step 2: Choose Your Tech Stack</h4><ul><li><p>Technology Selection: Choose the right technology for your project, considering factors such as robustness, flexibility, and alignment with platform goals</p></li><li><p>Framework Consideration: Evaluate frameworks like Django, Ruby on Rails, or JavaScript with Node.js based on their suitability for your project's requirements and objectives.</p></li><li><p>Alignment with Platform Goals: Ensure that the chosen technology aligns seamlessly with the goals and objectives of your platform, promoting overall success and efficiency.</p></li><li><p>Alignment with Platform Goals: Ensure that the chosen technology aligns seamlessly with the goals and objectives of your platform, promoting overall success and efficiency.</p></li></ul>`,
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default TiptapEditor