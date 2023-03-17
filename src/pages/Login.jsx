import logo from "../sentinel.png";
import bg from "../image/login-bg.png";
import "../css/pages/Login.scss";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
//redirect to home page
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginRemember, setLoginRemember] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerError, setRegisterError] = useState("");

    const handleLogin = async (e) => {
        setLoginError("");
        setLoading(true);
        e.preventDefault();
        const url = process.env.REACT_APP_API_URL;

        const response = await fetch(`${url}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            const { accessToken, refreshToken } = data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            props.setPseudoUser(true);

            navigate("/");
        } else {
            setLoginError(data.error);
        }
        setLoading(false);
    };
    const handleRegister = async (e) => {
        setRegisterError("");
        setLoading(true);
        e.preventDefault();
        const url = process.env.REACT_APP_API_URL;

        if (registerPassword !== registerConfirmPassword) {
            setRegisterError("Passwords do not match");
            return;
        }

        const response = await fetch(`${url}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassword,
            }),
        });
        try {
            const data = await response.json();
            if (response.ok) {
                //save token to local storage
                const { accessToken, refreshToken } = data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                props.setPseudoUser(true);

                //redirect to home page
                navigate("/");
            } else {
                setRegisterError(data.error);
            }
        } catch (e) {
            setRegisterError("Unknown error occurred");
        }
        setLoading(false);
    };

    //if user is already logged in, redirect to home page
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div
            className="login"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Link to="/" className="home">
                <AiFillHome size={30} />
            </Link>
            <div className="form">
                <div
                    className={`form-toggle${signUp ? " visible" : ""}`}
                    onClick={() => setSignUp(false)}
                ></div>
                <div
                    className="loading-panel"
                    style={{
                        display: loading ? "flex" : "none",
                    }}
                >
                    {/* Bootstrap spinner */}
                    <div className="spinner-border" role="status"></div>
                </div>
                <div
                    className={`form-panel one${signUp ? " hidden" : ""}${
                        loading ? " blur" : ""
                    }`}
                >
                    <div className="form-header">
                        <h1>Login</h1>
                    </div>
                    <div className="form-content">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required="required"
                                    value={loginEmail}
                                    onChange={(e) =>
                                        setLoginEmail(e.target.value)
                                    }
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required="required"
                                    value={loginPassword}
                                    onChange={(e) =>
                                        setLoginPassword(e.target.value)
                                    }
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-remember">
                                    <input
                                        type="checkbox"
                                        checked={loginRemember}
                                        onChange={(e) =>
                                            setLoginRemember(e.target.checked)
                                        }
                                    />
                                    Remember Me
                                </label>
                                <Link
                                    className="form-recovery"
                                    to="/forgot-password"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="form-group">
                                <button type="submit" disabled={loading}>
                                    Log In
                                </button>
                            </div>
                        </form>
                        {loginError && (
                            <>
                                <hr />
                                <Alert
                                    type="danger"
                                    message={loginError}
                                    icon={<AiFillHome />}
                                    onClose={() => setLoginError("")}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div
                    className={`form-panel two${signUp ? " active" : ""}${
                        loading ? " blur" : ""
                    }`}
                    onClick={() => {
                        if (signUp) return;
                        setSignUp(true);
                    }}
                >
                    <div className="form-header">
                        <h1>Register Account</h1>
                    </div>
                    <div className="form-content">
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="username">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required="required"
                                    value={registerName}
                                    onChange={(e) =>
                                        setRegisterName(e.target.value)
                                    }
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required="required"
                                    value={registerPassword}
                                    onChange={(e) =>
                                        setRegisterPassword(e.target.value)
                                    }
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="cpassword"
                                    name="cpassword"
                                    required="required"
                                    value={registerConfirmPassword}
                                    onChange={(e) =>
                                        setRegisterConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required="required"
                                    value={registerEmail}
                                    onChange={(e) =>
                                        setRegisterEmail(e.target.value)
                                    }
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" disabled={loading}>
                                    Register
                                </button>
                            </div>
                        </form>
                        {
                            //if registerError is not empty, then show error message
                            registerError && (
                                <>
                                    <hr />
                                    <Alert
                                        type="danger"
                                        message={registerError}
                                        icon={<AiFillHome />}
                                        onClose={() => setRegisterError("")}
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
