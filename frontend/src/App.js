import "./scss/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import DetailList from "./pages/detailList/DetailList";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "./api/api";
import AddChecklist from "./pages/addChecklist/AddChecklist";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditChecklist from "./pages/editChecklist/EditChecklist";

function App() {
    const [checkLists, setCheckLists] = useState([]);

    let theme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                light: "hsl(193, 43%, 71%)",
                main: "hsl(198, 55%, 39%)",
                medium: "hsl(198, 85%, 23%)",
                dark: "hsl(198, 93%, 11%)",
                black: "hsl(198, 95%, 7%)",
            },
            secondary: {
                light: "hsl(0, 0%, 100%)",
                main: "hsl(0, 0%, 100%)",
            },
            custom: {
                light: "hsl(0, 0%, 100%)",
                main: "hsl(0, 0%, 100%)",
                dark: "hsl(0, 0%, 100%)",
            },
        },

        typography: {
            fontFamily: "var(--ff-regular)",
        },
    });

    useEffect(() => {
        fetch(apiBaseUrl + "/list/all")
            .then((res) => res.json())
            .then((listArray) => setCheckLists(listArray));
    }, []);
    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={<Dashboard checkLists={checkLists} />}
                        />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/detaillist/:id"
                            element={
                                <DetailList
                                    setCheckLists={setCheckLists}
                                    checkLists={checkLists}
                                />
                            }
                        />
                        <Route
                            path="/add"
                            element={
                                <AddChecklist
                                    setChecklists={setCheckLists}
                                    checkLists={checkLists}
                                />
                            }
                        />
                        <Route
                            path="/edit/:id"
                            element={
                                <EditChecklist
                                    setCheckLists={setCheckLists}
                                    checkLists={checkLists}
                                />
                            }
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
