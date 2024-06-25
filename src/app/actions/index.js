'use server'

import { revalidatePath } from "next/cache";
import connectDB from "../database"
import User from "../models/user";

// add new user 
export async function addNewUserAction(formData, pathToRevalidate) {
    await connectDB();
    try {
        const newUser = await User.create(formData);
        if(newUser){
            revalidatePath(pathToRevalidate);
            return{
                success: true,
                message: 'User added successfully'
            }
        } else {
            return {
                success: false,
                message: 'Something wrong! Please try again'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}
// fetch user actions 
export async function fetchUsersAction(){
    await connectDB();
    try {
        const listofUsers = await User.find({});
        if(listofUsers){
            return {
                success: true,
                data: JSON.parse(JSON.stringify(listofUsers))
            }
        } else{
            return {
                success: false,
                message: 'Something wrong! Please try again'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}
// edit a user actions
export async function editUserAction(userId, formData, pathToRevalidate){
    await connectDB();
    try {
        const {firstName, lastName, email, address} = formData;
        const updateUser = await User.findOneAndUpdate({
            _id:userId
        }, { firstName, lastName, email, address }, {new: true});
        if(updateUser){
            revalidatePath(pathToRevalidate);
            return {
                success: true,
                message: 'User Updated Successfully'
            }
        } else{
            return {
                success: false,
                message: 'Something wrong! Please try again'
            }
        }
    } catch (error) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}
// delete a user actions 
export async function deleteUserAction(userID, pathToRevalidate){
    await connectDB();
    try {
        const deleteUser = await User.findByIdAndDelete(userID);
        if (deleteUser) {
            revalidatePath(pathToRevalidate);
            return {
                success: true,
                message: 'User Deleted Successfully'
            }
        } else {
            return {
                success: false,
                message: 'Something wrong! Please try again'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}