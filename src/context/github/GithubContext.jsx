import { createContext , useReducer} from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user:{},
        repos: [],
        loading: false,
    }
    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get search results
    const SearchUsers = async (text) => {
        setLoading();

        const response = await fetch(`https://api.github.com/search/users?q=${text}`);
        const {items} = await response.json();
        console.log(items);

        dispatch({
            type: "GET_USERS",
            payload: items,
        })
    }

    // Get single user
    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`https://api.github.com/users/${login}`);
        const data = await response.json();

        if(response.status === 404){
            window.location ='/notfound'
        }else{
            dispatch({
                type: "GET_USER",
                payload: data,
            })
        }
    }
    
    // Get user Repos
    const getUserRepos = async (login) => {
        setLoading();

        const params = new URLSearchParams({
            sort: "created",
            per_page: 10
        })

        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`);
        const data = await response.json();
        dispatch({
            type: "GET_REPOS",
            payload: data,
        })
    }

    //Clear users from state
    const clearUsers = () => {
        dispatch({type: "CLEAR_USERS"})
    }
    //Set loading 
    const setLoading = () => dispatch({
        type: 'SET_LOADING',
    });
    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        SearchUsers,
        getUser,
        clearUsers,
        getUserRepos,
    }}>
        {children}
    </GithubContext.Provider>
};

export default GithubContext;