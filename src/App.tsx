import { useState } from "react";
import waldo_image from "./assets/waldoimg.jpeg";
import waldo from "./assets/waldo.jpg";
import odlaw from "./assets/odlaw.jpg";
import wizard from "./assets/wizard.jpg";
import "./stylesheets/App.css";

function App() {
    const [Display, setDisply] = useState("none");
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);

    const selection = (event: any) => {
        setX(event.clientX);
        setY(event.clientY);

        if (Display == "none")
        {
            setDisply("block");
        }

        else
        {
            setDisply("none");
        }
    }

    const handleForm = (event: any) => {
        setDisply("none");

        event.preventDefault();
    }

    const styles = {
        display: Display,
        left: `${X}px`,
        top: `${Y}px`
    }

    return (
        <div className="App">
            <div className="popup" style={styles}>
                <form onSubmit={handleForm}>
                    <input type="submit" value="Wizard" />
                    <input type="submit" value="Waldo" />
                    <input type="submit" value="Odlaw" />
                </form>
            </div>

            <div className="picture" onClick={selection}>
                <h1>Time:</h1>
                <img id="main-pic" src={waldo_image} alt="Where's Waldo Picture." />
                <div className="icons">
                    <div className="image">
                        <img src={wizard} alt="Picture of the wizard." />
                        <h4>Wizard</h4>
                    </div>
                    <div className="image">
                        <img src={waldo} alt="Picture of Waldo." />
                        <h4>Waldo</h4>
                    </div>
                    <div className="image"> 
                        <img src={odlaw} alt="Picture of Odlaw" />
                        <h4>Odlaw</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
