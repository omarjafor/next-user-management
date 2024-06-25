import AddNewUser from '@/components/add-new-user';
import { fetchUsersAction } from '../actions';
import SingleUser from '@/components/single-user';


const UserManagement = async() => {
    const getListofUsers = await fetchUsersAction();
    
    return (
        <div className='p-20'>
            <div className='flex justify-between'>
                <h3>User Management</h3>
                <AddNewUser />
            </div>
            <div className='mt-6 grid grid-cols-3 gap-4'>
                {
                    getListofUsers && getListofUsers.data && getListofUsers.data.length > 0 ?
                        getListofUsers.data.map(user => <SingleUser user={user} />)
                    : <h2 className='text-2xl font-bold text-red-500 text-center'>No User Found Here</h2>
                }
            </div>
        </div>
    );
};

export default UserManagement;