import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Login from "./Login"
import Signup from "./Signup"

const theme = createTheme({
    palette: {
        primary: {
            main: "#6200ee", // Replace with your kPrimaryColor
        },
        background: {
            default: "#f5f5f5", // Replace with your kScaffoldBackgroundColor
        },
    },
    typography: {
        fontFamily: "Poppins, Arial, sans-serif",
    },
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Login />
            <Signup />
        </ThemeProvider>
    )
}

export default App
