'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { deleteUserAction } from "@/app/actions";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "@/context";


const SingleUser = ({ user }) => {
    const { setCurrentEditedId, setOpenDialog, setUserFormData } = useContext(UserContext);

    async function handleDelete(userId){
        const result = await deleteUserAction(userId, '/user-management');
        if(result?.success){
            toast.success(result.message)
        }
    }

    function handleEdit(user){
        setOpenDialog(true);
        setUserFormData({
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            address: user?.address
        });
        setCurrentEditedId(user?._id)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
                <CardDescription> {user?.address} </CardDescription>
            </CardHeader>
            <CardContent>
                <p> {user?.email} </p>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <Button onClick={() => handleEdit(user)}>Edit</Button>
                <Button onClick={() => handleDelete(user?._id)}>Delete</Button>
            </CardFooter>
        </Card>

    );
};

export default SingleUser;