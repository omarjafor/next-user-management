import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";


const SingleUser = ({ user }) => {
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
                <Button>Edit</Button>
                <Button>Delete</Button>
            </CardFooter>
        </Card>

    );
};

export default SingleUser;