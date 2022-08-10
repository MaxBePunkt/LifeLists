import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const [value, setValue] = useState("Dashboard");
    let navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <header>
            <h1 className="logo">
                L<span>i</span>feL<span>i</span>sts
            </h1>
            <BottomNavigation
                style={{
                    // width: "20%",
                    margin: "0 auto",
                    backgroundColor: "var(--clr-blue-medium)",
                }}
                // sx={{ width: 50 }}
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    label="Dashboard"
                    value="Dashboard"
                    icon={<DashboardIcon />}
                    style={{
                        color: "var(--clr-white)",
                        fontSize: "var(--fs-600)",
                    }}
                    onClick={() => navigate("/")}
                />
                <BottomNavigationAction
                    label="Profile"
                    value="Profile"
                    icon={<AccountBoxIcon />}
                    style={{
                        color: "var(--clr-white)",
                        fontSize: "var(--fs-600)",
                    }}
                    onClick={() => navigate("/profile")}
                />
            </BottomNavigation>
        </header>
    );
};

export default Header;
