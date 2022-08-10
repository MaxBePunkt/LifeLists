import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import ChecklistForm from "../../components/checklistForm/ChecklistForm";

const AddChecklist = ({ setChecklists, checkLists }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [oneCheckpoint, setOneCheckpoint] = useState("");
    const [checkpoints, setCheckpoints] = useState([]);

    const addList = () => {
        fetch(apiBaseUrl + "/list/add", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                imageURL: imageURL,
                checkpoints: checkpoints,
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                setChecklists([data, ...checkLists]);
                console.log(data);
            })
            .then(() => navigate("/"));
    };
    return (
        <section className="addChecklist">
            <div className="wrap">
                <Button
                    variant="contained"
                    style={{
                        color: "var(--clr-blue-medium)",
                        backgroundColor: "var(--clr-blue-light)",
                        width: "max-content",
                        margin: "2% 0",
                    }}
                    size="medium"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <ChecklistForm
                    submitText="add"
                    setName={setName}
                    name={name}
                    setDescription={setDescription}
                    description={description}
                    setImageURL={setImageURL}
                    imageURL={imageURL}
                    setOneCheckpoint={setOneCheckpoint}
                    oneCheckpoint={oneCheckpoint}
                    setCheckpoints={setCheckpoints}
                    checkpoints={checkpoints}
                    submit={addList}
                />
            </div>
        </section>
    );
};

export default AddChecklist;
