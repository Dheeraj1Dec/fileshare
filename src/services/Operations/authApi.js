import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken, setSignupData } from "../../slices/authSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    AUTH0_LOGIN
} = endpoints

export function sendOtp(email, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Sending OTP...")
        dispatch(setLoading(true));

        try {
            console.log(email);
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });

            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")

            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async (dispatch) => {
        const toastId = toast.loading("Loding....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            });

            console.log("SIGNUP API RESPONSE............", response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("SignUp Successfully");
            navigate("/login");

        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(
    email,
    password,
    navigate
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            });

            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            dispatch(setSignupData(response.data.data));

            const userData = response.data.data
            // dispatch(setUser(userData))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(userData))
            localStorage.setItem("loginType", "password");
            
            navigate("/dashboard")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function auth0_login(auth0User, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", AUTH0_LOGIN, {
                auth0_id: auth0User.sub,       
                email: auth0User.email,
                name: auth0User.name,
                image: auth0User.picture,
            });

            console.log("AUTH0 LOGIN RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful via Auth0");
            dispatch(setToken(response.data.token));
            dispatch(setSignupData(response.data.data));

            const userData = response.data.data;
            console.log(userData);
            // dispatch(setUser(userData));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("loginType", "auth0");

            navigate("/dashboard");

        } catch (error) {
            console.log("Auth0 LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function logout(
    navigate, 
    isAuth0 = false, 
    auth0LogoutFn = null
){
    return (dispatch) => {
        dispatch(setToken(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("loginType");
        localStorage.removeItem("userFiles");

        toast.success("Logged Out")

        if (isAuth0 && auth0LogoutFn) {
            auth0LogoutFn({
            returnTo: window.location.origin,
            })
        } else {
            navigate("/")
        }
    }
}
