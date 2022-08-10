import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardListCard from "../../components/dashboardListCard/DashboardListCard";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ checkLists }) => {
    const navigate = useNavigate();
    return (
      
        <section className="dashboard">
            <div className="wrap">
                <article className="dashboard__grid">
                    <Fab
                        style={{
                            color: "var(--clr-blue-medium)",
                            backgroundColor: "var(--clr-blue-light)",
                        }}
                        aria-label="add"
                        onClick={() => navigate("/add")}
                    >
                        <AddIcon />
                    </Fab>
                    {checkLists &&
                        checkLists.map((data, i) => (
                            <DashboardListCard
                                key={i}
                                id={data._id}
                                title={data.title}
                                description={data.description}
                                thumbnailImage={data.thumbnailImage}
                            />
                        ))}
                </article>
            </div>
        </section>
    );
};

export default Dashboard;
