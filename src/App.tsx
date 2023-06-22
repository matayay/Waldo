import React, { useState, useEffect } from "react";
import waldo_image from "./assets/waldoimg.jpeg";
import waldo from "./assets/waldo.jpg";
import odlaw from "./assets/odlaw.jpg";
import wizard from "./assets/wizard.jpg";
import axios from "axios";
import "./stylesheets/App.css";

interface Positions {
    Odlaw: {
        Xratio: number;
        Yratio: number;
    };
    Waldo: {
        Xratio: number;
        Yratio: number;
    };
    Wizard: {
        Xratio: number;
        Yratio: number;
    };
}

function App() {
    const [Display, setDisplay] = useState("none");
    const [styleWiz, setStyleWiz] = useState("100%");
    const [styleWald, setStyleWald] = useState("100%");
    const [styleOd, setStyleOd] = useState("100%");
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [index, setIndex] = useState(0);
    const [imageRect, setImageRect] = useState<DOMRect>();
    const [data, setData] = useState<Positions>();
    const [time, setTime] = useState(0);

    const styles = {
        display: Display,
        left: `${X}px`,
        top: `${Y}px`,
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://where-s-waldo-e98f8-default-rtdb.firebaseio.com/Data.json`
            );

            setData(response.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        let intervalId: any;

        if (styleWiz != "20%" || styleWald != "20%" || styleOd != "20%") {
            intervalId = setInterval(() => setTime(time + 1), 100);
        }

        return () => clearInterval(intervalId);
    }, [time]);

    const selection = (event: React.MouseEvent) => {
        setX(event.pageX);
        setY(event.pageY);
        setImageRect(event.currentTarget.getBoundingClientRect());

        if (Display === "none") {
            setDisplay("block");
        } else {
            setDisplay("none");
        }
    };

    const handleSuccess = (name: string) => {
        if (name == "Wizard") {
            setStyleWiz("20%");
        } else if (name == "Waldo") {
            setStyleWald("20%");
        } else if (name == "Odlaw") {
            setStyleOd("20%");
        }
    };

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisplay("none");

        let curr_val = event.currentTarget.elements[index] as HTMLInputElement;
        let xRatio: number = 0;
        let yRatio: number = 0;
        let X2: number = 0;
        let Y2: number = 0;

        if (data) {
            if (curr_val.value == "Wizard") {
                xRatio = data.Wizard.Xratio;
                yRatio = data.Wizard.Yratio;
            } else if (curr_val.value == "Waldo") {
                xRatio = data.Waldo.Xratio;
                yRatio = data.Waldo.Yratio;
            } else if (curr_val.value == "Odlaw") {
                xRatio = data.Odlaw.Xratio;
                yRatio = data.Odlaw.Yratio;
            }
        }

        if (imageRect) {
            X2 = imageRect.width / xRatio + (imageRect.left + window.scrollX);
            Y2 = imageRect.height / yRatio + (imageRect.top + window.scrollY);
        }

        let distance = Math.sqrt(
            Math.abs(Math.pow(X2 - X, 2) + Math.pow(Y2 - Y, 2))
        );

        if (distance <= 15) {
            handleSuccess(curr_val.value);
        }
    };

    return (
        <div className="App">
            <div className="popup" style={styles}>
                <form onSubmit={handleForm}>
                    <input
                        type="submit"
                        value="Wizard"
                        onClick={() => setIndex(0)}
                    />
                    <input
                        type="submit"
                        value="Waldo"
                        onClick={() => setIndex(1)}
                    />
                    <input
                        type="submit"
                        value="Odlaw"
                        onClick={() => setIndex(2)}
                    />
                </form>
            </div>

            <div className="picture">
                <h1>Time: {time}</h1>
                <img
                    onClick={selection}
                    id="main-pic"
                    src={waldo_image}
                    alt="Where's Waldo Picture."
                />
                <div className="icons">
                    <div className="image" style={{ opacity: styleWiz }}>
                        <img src={wizard} alt="Picture of the wizard." />
                        <h4>Wizard</h4>
                    </div>
                    <div className="image" style={{ opacity: styleWald }}>
                        <img src={waldo} alt="Picture of Waldo." />
                        <h4>Waldo</h4>
                    </div>
                    <div className="image" style={{ opacity: styleOd }}>
                        <img src={odlaw} alt="Picture of Odlaw" />
                        <h4>Odlaw</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
