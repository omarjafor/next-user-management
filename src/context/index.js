'use client'
import { initialFormData } from "@/components/utils";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserState({children}){
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [userFromData, setUserFormData] = useState(initialFormData);

    return <UserContext.Provider value={{currentEditedId, setCurrentEditedId, openDialog, setOpenDialog, userFromData, setUserFormData}}>{children}</UserContext.Provider>
}