import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Outlet,
} from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import "./css/core.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Guides from "./pages/Guides";
import Login from "./pages/Login";
import User from "./pages/User";
import { BiChat } from "react-icons/bi";

const PageLayout = ({ children }) => children;

//slide in from left
const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
};
const AnimationLayout = (props) => {
    const { pathname } = useLocation();

    return (
        <PageLayout>
            {pathname !== "/login" && (
                <SiteNav pseudoUser={props.pseudoUser} logout={props.logout} />
            )}
            <motion.div
                className="page"
                key={pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Outlet />
            </motion.div>

            {/* chat icon */}
            <div className="chat-icon">
                <BiChat />
            </div>

            {pathname !== "/login" && <Footer />}
        </PageLayout>
    );
};

function App() {
    const dispatch = useDispatch();

    const activeUser = useSelector((state) => state.activeUser);
    const [pseudoUser, setPseudoUser] = useState(null);

    const fetchActiveUser = async () => {
        if (localStorage.getItem("accessToken")) setPseudoUser(true);
        else setPseudoUser(false);

        if (!pseudoUser) return;
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/@me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            dispatch({ type: "SET_USER", payload: data });
        } else {
            if (
                data.message === "Invalid token" ||
                data.message === "Token expired"
            ) {
                //fetch new access token
                const response = await fetch(`/auth/refresh`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refreshToken: localStorage.getItem("refreshToken"),
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    //set new access token in local storage, and fetch user data again
                    const { accessToken, refreshToken } = data;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    fetchActiveUser();
                } else {
                    //if refresh token is invalid, remove it from local storage
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                }
            } else {
                dispatch({ type: "SET_USER", payload: {} });
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        setPseudoUser(false);
        dispatch({ type: "SET_USER", payload: {} });
    };

    useEffect(() => {
        //if accessToken is in local storage, set pseudoUser to true
        //now we fetch the user data from the server
        fetchActiveUser();
    }, [pseudoUser]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <AnimationLayout
                                pseudoUser={pseudoUser}
                                setPseudoUser={setPseudoUser}
                                logout={logout}
                            />
                        }
                    >
                        <Route path="/" element={<Home />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/guides" element={<Guides />} />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    setPseudoUser={setPseudoUser}
                                    pseudoUser={pseudoUser}
                                />
                            }
                        />
                        <Route path="/user" element={<User />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
