'use client'
import Image from "next/image";
import React, {  useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Edit2, ImageIcon, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { usePostStore } from "@/stores/postStore";


function arrayToFileList(files: File[]): FileList {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer.files;
}
async function convertUrlsToFiles(urls: string[]): Promise<File[]> {
  const files = await Promise.all(
    urls.map(async (url, index) => {
      const response = await fetch(url); // Fetch the image from the URL
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image from ${url}: ${response.statusText}`);
      }

      const blob = await response.blob(); // Convert the response to a Blob
      return new File([blob], `image-${index + 1}.webp`, { type: blob.type }); // Create a File object
    })
  );

  return files; // Return the array of File objects
}


export default function ImageUpload() {

  const {updatePost} = usePostStore()

  const [images, setImages] = useState<File[] >([]);

  const {

    control,
    formState: { errors },
    setValue
  } = useFormContext();


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      setImages((prevImages) => [
        ...prevImages,
        ...Array.from(e.target.files || []),
      ]);

      const newFilesArray = Array.from(e.target.files);
      const updatedFilesArray = [...images, ...newFilesArray];
      const updatedFileList = arrayToFileList(updatedFilesArray);

      setValue("images", updatedFileList); 
    }
  };


  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (currentImageIndex >= images.length - 1) {
      setCurrentImageIndex(Math.max(0, images.length - 2));
    }
    const filterImage = images.filter((_, i) => i !== index)
     
    const updatedFileList = arrayToFileList([...filterImage]);
    setValue("images", updatedFileList); 
  };

useEffect(() => {
  const imageFiles = async (images:string[]) => {
    const res = await convertUrlsToFiles(images)
    const fileList = arrayToFileList(res)

    setValue('images' ,fileList)
    setImages(res)
  }
  if(updatePost?.images){
    imageFiles(updatePost.images)
  }
  
}, [])

  return (
    <div className="relative rounded-md p-8 min-h-[300px] bg-gray-100 ">
      <div className="absolute top-0 left-2 flex gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => document.getElementById("images")?.click()}
          className="text-[#D7DADC] bg-primary m-4"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Add
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="text-[#D7DADC] bg-primary m-4"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit All
        </Button>
      </div>
      <Controller
        name="images"
        control={control}
 
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            id="images"
            type="file"
            className="hidden"
            accept="image/*"
            
            multiple
            onChange={(e) => {
             
              onChange(e.target.files);
              // Call react-hook-form's onChange and pass the FileList
              
              // Optionally handle your custom logic here
              handleImageChange(e);
            }}
            ref={ref} 
            onBlur={onBlur} 
          />
        )}
      />
      {images.length > 0 ? (
        <>
          <Image
            width={100}
            height={100}
            src={URL.createObjectURL(images[currentImageIndex])}
            alt={`Selected image ${currentImageIndex + 1}`}
            className="object-cover h-[300px] w-full"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => removeImage(currentImageIndex)}
            className="absolute top-2 right-2 text-[#D7DADC] bg-primary"
          >
            <Trash2 className="w-4 h-4  text-white" />
          </Button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-2 h-2 rounded-full  ${
                  index === currentImageIndex ? "bg-[#D7DADC]" : "bg-[#818384]"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-[#818384]">
          Drag and drop images or Upload
        </div>
      )}
      {errors.images && (
        <p className="text-red-500">{errors.images.message as string}</p>
      )}
    </div>
  );
}
