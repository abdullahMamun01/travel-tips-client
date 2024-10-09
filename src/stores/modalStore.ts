

// type TModal  = {
//     openModal : boolean ,
//     closeModal :boolean
// }

import { create } from "zustand"
import { usePostStore } from "./postStore"


type TModalState = {
    isOpen : boolean ,
  
    setOpenModal  : () => void ,
    setCloseModal  : () => void ,
    toggleModal: () => void 

}


export const useModal  = create<TModalState>((set) => ({
    isOpen : false ,
    setOpenModal  : () =>  set({isOpen: true}),
    setCloseModal  : () =>  set({isOpen: false}) ,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen }))
}))