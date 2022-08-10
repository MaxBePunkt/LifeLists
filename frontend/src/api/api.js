export const apiBaseUrl =
    process.env.REACT_APP_API_PATH === "dev"
        ? "http://localhost:1818"
        : "https://......herokuapp.com";
