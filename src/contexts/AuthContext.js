import { createContext, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../storage/slices/authSlice";
import { logoutUser, refreshToken } from "../storage/actions/authAction";
import { useLocation } from "react-router-dom";

const AuthContext = createContext({
    isloading: true,
    userInfo: null
})

const publicUrlList = ['/login'];
export const AuthProvider = ({ children }) => {
    const userDetails = useSelector(selectUserInfo);
    const [isloading, setIsloading] = useState(true);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                const { status } = await dispatch(refreshToken());
                if (status === 401 && !publicUrlList.includes(pathname)) {
                    await dispatch(logoutUser());
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsloading(false);
            }
        }
        !userDetails?.accessToken ? verifyRefreshToken() : setIsloading(false);
        return () => isMounted = false;
        // eslint-disable-next-line
    }, [])
    const value = {
        isloading,
        userInfo: userDetails
    }
    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}

const useAuth = () => useContext(AuthContext);
export default useAuth;