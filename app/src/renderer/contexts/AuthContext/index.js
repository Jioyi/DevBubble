import 
    React, { 
    createContext,
    useEffect,
    useRef,
    useState
} from 'react';
import store from '../../redux/store/myStore'
import { 
    signIn as sI,
    checkToken
} from '../../redux/API'

export const AuthContext = createContext();

const initialStates = {
    isAuthenticated: false,
    isErrorAuth: false,
    isLoadingAuth: false
};
const errorStates = {
    isAuthenticated: false,
    isErrorAuth: true,
    isLoadingAuth: false
};
const successStates = {
    isAuthenticated: true,
    isErrorAuth: false,
    isLoadingAuth: false
};
const loadingStates = {
    isAuthenticated: false,
    isErrorAuth: false,
    isLoadingAuth: true
};

const AuthContextProvider = ({ children }) => {
    const [ states, setStates ] = useState(initialStates)
    const user = useRef(null);
    
    // CHEQUEO DE TOKEN PRIMER CARGA
    // CON LOCAL STORAGE
    useEffect(async ()=>{
        setStates(loadingStates);
        try {
            const { data } = await checkToken();
            user.current = data;
            setStates(successStates);
        } catch(err) {
            user.current = null;
            setStates(errorStates);
        }
    },[])

    // AUTENTICACIÓN
    const signIn = async (body) => {
        setStates(loadingStates)
        try { 
            const { data } = await sI(body);
            if (data.success) {
                // store.setItem('access_token', data.token);
                user.current = data.user;
                setStates(successStates)
            } else {
                user.current = null;
                setStates(errorStates)
            }
        } catch(err) {
            // store.removeItem('acces_token');
            user.current = null;
            setStates(errorStates);
        }
    }

    // LOGOUT
    const logOut = () => {
        store.removeItem('access_token');
        setStates(initialStates);
        user.current = null;
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: states.isAuthenticated,
                isLoadingAuth: states.isLoadingAuth,
                isErrorAuth: states.isErrorAuth,
                user,
                signIn,
                logOut
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
