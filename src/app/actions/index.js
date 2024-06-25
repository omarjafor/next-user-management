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

// delete a user actions 