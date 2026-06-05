import { useState } from "react";
import api from "../services/api";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function AIChat() {

    const [prompt, setPrompt] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const handleAskAI = async () => {

        try {

            setLoading(true);

            const token =
            localStorage.getItem("token");

            const response =
            await api.post(

                "/ai-chat",

                {
                    prompt
                },

                {
                    headers: {
                        Authorization: token
                    }
                }

            );

            setAnswer(
                response.data.answer
            );

        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    };

    return (

        <div>

            <h1>

                AI Recommendation Assistant

            </h1>

            <input

                type="text"

                value={prompt}

                onChange={(e)=>
                    setPrompt(e.target.value)
                }

                placeholder="Recommend dark anime"

            />

            <button
                onClick={handleAskAI}
            >

                Ask AI

            </button>

            {

                loading &&

                <p>
                    Thinking...
                </p>

            }

            <div>

                {answer}

            </div>

        </div>

    );

}

export default AIChat;