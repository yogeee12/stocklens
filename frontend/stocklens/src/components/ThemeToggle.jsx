import { useState, useEffect } from "react";

function ThemeToggle(){
    const [darkMode , setDarkMode] = useState(null)

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode])

    return(
        <div className="data-theme">
            <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
            </button>
        </div>
    )
}

export default ThemeToggle