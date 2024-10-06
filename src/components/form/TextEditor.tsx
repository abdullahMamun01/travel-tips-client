/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS

import { Label } from "../ui/label";
import { Control, Controller, useFormContext } from "react-hook-form";


// Quill Toolbar Configuration
const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"], // remove formatting
    ],
    handlers: {
      image: () => handleImageUpload(), // custom image upload handler
    },
  },
  clipboard: {
    matchVisual: false, // Toggle to remove extra line breaks when pasting
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

// Custom image upload function
const handleImageUpload = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files ? input.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      // Replace with your image upload endpoint
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const quill = Quill.find(document.querySelector(".ql-container")!); // Get Quill instance
      const range = quill.getSelection(); // Get the cursor position
      if (range) {
        quill.insertEmbed(range.index, "image", data.imageURL); // Insert image at cursor position
      }
    }
  };
};
type TEditorProps = {
  formControl: Control<any>;
};

// TypeScript Functional Component
const TextEditor = ({ formControl }: TEditorProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="my-8">
      <Label className="mb-8">Description</Label>
      <Controller
        name="description"
        control={formControl}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <ReactQuill
            {...field}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="Write something amazing..."
            className="h-[200px] mt-4"
          />
        )}
      />

      {errors.description && (
        <p className="text-red-500">{errors.description.message as string}</p>
      )}
    </div>
  );
};

export default TextEditor;
