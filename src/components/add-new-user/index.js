'use client'

import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react";
import { addNewUserFormControl, initialFormData } from "../utils";
import { addNewUserAction, editUserAction } from "@/app/actions";
import toast from "react-hot-toast";
import { UserContext } from "@/context";


const AddNewUser = () => {
    const { currentEditedId, setCurrentEditedId, openDialog, setOpenDialog, userFromData, setUserFormData } = useContext(UserContext);

    function handleButtonValid() {
        return Object.keys(userFromData).every(
            (key) => userFromData[key].trim() !== ''
        );
    }

    async function handleAddNewUserAction(){
        const result = currentEditedId !== null ? await editUserAction(currentEditedId, userFromData, '/user-management' ) : await addNewUserAction(userFromData, '/user-management');
        if(result?.success){
            setOpenDialog(false);
            setUserFormData(initialFormData);
            setCurrentEditedId(null);
            toast.success(result.message);
        }
    }

    return (
        <div>
            <Button onClick={() => setOpenDialog(true)}>Add New User</Button>
            <Dialog open={openDialog} onOpenChange={() => {
                setOpenDialog(false);
                setUserFormData(initialFormData);
                setCurrentEditedId(null);
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {currentEditedId ? 'Edit User Here':'Add New User'}
                        </DialogTitle>
                        <DialogDescription>
                            {currentEditedId ? 'Edit User' : 'Add New User'} profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={handleAddNewUserAction} className="grid gap-4 py-4">
                        {
                            addNewUserFormControl.map((items, index) =>
                                <div key={index} className="mb-2">
                                    <Label htmlFor={items.name} className="text-right">
                                        {items.label}
                                    </Label>
                                    <Input
                                        id={items.name}
                                        name={items.name}
                                        placeholder={items.placeholder}
                                        className="col-span-3 mt-2"
                                        type={items.type}
                                        value={userFromData[items.name]}
                                        onChange={(e) => setUserFormData({
                                            ...userFromData,
                                            [items.name]: e.target.value
                                        })}
                                    />
                                </div>)
                        }
                        <DialogFooter>
                            <Button
                                className='disabled:opacity-55'
                                disabled={!handleButtonValid()}
                                type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewUser;