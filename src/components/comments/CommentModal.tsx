import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import CommentBox from "./CommentBox";

import {  ReactNode } from "react";


export default function CommentModal() {

  return (

      
      <DialogContent className="sm:max-w-[825px]">
        <h1>hello</h1>
        <CommentBox/>
      </DialogContent>

  );
}
