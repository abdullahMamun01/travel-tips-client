import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ControlledInput from "../ControlledInput/ControlledInput";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SubmitButton from "./SubmitButton";

import { UpdateProfileFormValues } from "@/types/profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfilSchmea } from "@/validate-schema/profile.schmea";
import useAuth from "@/stores/authSore";
import useUpdateUserProfile from "@/hooks/user/useProfileUpdate";
import imageUrlParser from "@/lib/imageUrlParser";

export default function ProfileForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { auth, setAuth } = useAuth();
  const user = auth?.user;
  const { mutateAsync, isPending } = useUpdateUserProfile(user?._id as string);

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfilSchmea),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone || "",
      address: user?.address || "",
      bio: user?.bio || "",
      location: user?.location || "",
    },
  });
  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<UpdateProfileFormValues> = async (
    formValues
  ) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(formValues)) {
      if (key === "image" && value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(`image`, file);
        });
      } else {
        formData.append(key, value as string);
      }
    }

    const response = await mutateAsync({
      body: formData,
      token: auth?.token as string,
    });
    const { firstName, lastName, location, image, bio, phone,isVerified } = response;
    setAuth({
      token: auth?.token as string,
      user: {
        firstName,
        lastName,
        location,
        image,
        bio,
        phone,
        isVerified
      },
    });
  };

  const handleFileChange = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);

      // Return cleanup function
      return () => URL.revokeObjectURL(url);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="col-span-4">
            <div>
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    imagePreview ||
                    (user?.image && imageUrlParser(user.image)) ||
                    "https://api.dicebear.com/6.x/initials/svg?seed=p"
                  }
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Label htmlFor="image" className="cursor-pointer">
                <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 py-4">
                  <Upload className="w-4 h-4" />
                  <span className="">Upload new picture</span>
                </div>
              </Label>
              <Controller
                name="image"
                control={form.control}
                render={({ field: { onChange, onBlur } }) => (
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleFileChange(e.target.files);
                    }}
                    onBlur={onBlur}
                    className="hidden"
                  />
                )}
              />
              {errors.image && (
                <p className="text-red-600 text-sm">
                  {errors.image.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-4 mt-2">
            <ControlledInput
              name="firstName"
              formControl={form.control}
              inputType="text"
              label="First Name"
              placeholder="Enter Your First Name"
            />
          </div>
          <div className="col-span-4 mt-2">
            <ControlledInput
              name="lastName"
              formControl={form.control}
              label="Last Name"
              inputType="text"
              placeholder="enter your last name"
            />
          </div>
          <div className="col-span-4 mt-2">
            <ControlledInput
              name="phone"
              formControl={form.control}
              label="Phone No."
              inputType="phone"
              placeholder="enter your phone no."
            />
          </div>
          <div className="col-span-4 mt-2">
            <ControlledInput
              name="address"
              formControl={form.control}
              label="Address"
              inputType="text"
              placeholder="enter your address"
            />
          </div>
          <div className="col-span-4 mt-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Add a bio..."
              className="w-full resize-none mt-2"
              rows={3}
              {...register("bio")}
            />
            {/* Show validation error */}
            {errors.comment && (
              <p className="text-red-500 text-sm">
                {errors.comment.message as string}
              </p>
            )}
            <div className="col-span-4 mt-2">
              <ControlledInput
                name="location"
                formControl={form.control}
                label="Location"
                inputType="text"
                placeholder="enter your location"
              />
            </div>
          </div>
        </div>
        <SubmitButton isLoading={isPending}>updat profile</SubmitButton>
      </form>
    </FormProvider>
  );
}
