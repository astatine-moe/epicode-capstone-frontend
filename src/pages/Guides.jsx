import { BiSearch, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import "../css/pages/Guides.scss";

const Guides = () => {
    const activeUser = useSelector((state) => state.activeUser);
    return (
        <div className="container guides">
            <div className="row">
                <div className="col-4">
                    <div className="guides__nav">
                        <button className="active">All Guides</button>

                        <hr />

                        <h4>Popular Topics</h4>

                        <button>VPNs</button>
                        <button>Password Management</button>
                        <button>Browser Extensions</button>
                        <button>Online Security</button>
                        <button>Online Safety</button>
                        <button>Online Privacy</button>
                    </div>
                </div>
                <div className="col-8">
                    <div className="guides__content">
                        <h1>Guides</h1>
                        <p>
                            Come here to learn how to protect your privacy and
                            stay safe online.
                        </p>
                        <div className="search__bar">
                            <BiSearch />
                            <input type="text" placeholder="Search Guides" />
                        </div>

                        {activeUser?._id && activeUser?.role === "writer" && (
                            <>
                                <hr />
                                <button className="btn btn-primary">
                                    <BiPlus className="me-2" />
                                    Create Guide
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guides;
