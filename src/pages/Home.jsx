import { useDispatch, useSelector } from "react-redux";
import "../css/pages/Home.scss";

const Home = () => {
    const activeUser = useSelector((state) => state.activeUser);
    return (
        <>
            <div className="header">
                <div className="title">
                    <h1>Sentinel Solutions</h1>
                    <p className="subtitle">
                        We are a team of highly skilled and experienced
                        professionals who are passionate about providing the
                        best solutions for our clients.
                    </p>
                </div>
            </div>
            <div className="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path d="M0,96L40,85.3C80,75,160,53,240,80C320,107,400,181,480,192C560,203,640,149,720,154.7C800,160,880,224,960,234.7C1040,245,1120,203,1200,181.3C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
            </div>
            <div className="content">
                <div className="row text-center">
                    <div className="col-md-4">
                        <h5 className="card-title">Feature 1</h5>
                    </div>
                    <div className="col-md-4">
                        <h5 className="card-title">Feature 2</h5>
                    </div>
                    <div className="col-md-4">
                        <h5 className="card-title">Feature 3</h5>
                    </div>
                </div>
                <div className="row">
                    <pre>
                        {activeUser?._id && JSON.stringify(activeUser, null, 4)}
                    </pre>
                </div>
            </div>
        </>
    );
};

export default Home;
