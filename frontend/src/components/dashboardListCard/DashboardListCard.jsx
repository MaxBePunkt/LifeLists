import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const DashboardListCard = ({ id, thumbnailImage, title, description }) => {
    let navigate = useNavigate();

    return (
        <div className="dashboard__grid__card">
            <Card
                style={{
                    backgroundColor: "var(--clr-blue-black)",
                }}
            >
                <CardMedia
                    component="img"
                    alt={title}
                    height="200"
                    image={
                        thumbnailImage ||
                        "https://ha-lehmann.at/wp-content/uploads/2020/06/placeholder.png"
                    }
                />
                <CardContent
                    style={{
                        color: "var(--clr-white)",
                    }}
                >
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: "var(--ff-regular)",
                        }}
                        variant="body2"
                        color="var(--clr-white)"
                    >
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        style={{
                            color: "var(--clr-blue-medium)",
                            backgroundColor: "var(--clr-blue-light)",
                        }}
                        size="medium"
                        onClick={() => navigate(`/detaillist/${id}`)}
                    >
                        open
                    </Button>
                    <Button
                        variant="outlined"
                        style={{
                            color: "var(--clr-blue-medium)",
                            border: "1px solid var(--clr-blue-medium)",
                            marginLeft: "auto",
                        }}
                        size="medium"
                        onClick={() => navigate(`/edit/${id}`)}
                    >
                        edit
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default DashboardListCard;
