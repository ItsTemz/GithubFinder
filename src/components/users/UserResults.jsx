import {useContext} from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';
function UserResults() {
    const {users, loading} = useContext(GithubContext);
    
    if(!loading) {
        return (
          <div className = 'grid gird-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-10' >
              {users.map((user) =>(
                <UserItem key={user} user={user} />
              ))}
          </div>
        ) 
        
    }else {
        return <Spinner />
    }
}

export default UserResults