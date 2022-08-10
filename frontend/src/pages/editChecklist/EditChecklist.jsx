import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import ChecklistForm from "../../components/checklistForm/ChecklistForm";

const EditChecklist = ({ setCheckLists, checkLists }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [checklist, setChecklist] = useState({});

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [oneCheckpoint, setOneCheckpoint] = useState("");
    const [checkpoints, setCheckpoints] = useState([]);

    const editCheckList = () => {
        fetch(apiBaseUrl + "/list/edit", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listId: id,
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
                const filteredData = checkLists.filter((l) => l._id !== id);
                return { data, filteredData };
            })
            .then(({ data, filteredData }) =>
                setCheckLists([data, ...filteredData])
            )
            .then(() => navigate("/"));
    };

    useEffect(() => {
        fetch(apiBaseUrl + "/list/one/" + id)
            .then((res) => res.json())
            .then((listArray) => setChecklist(listArray))
            .then(() => {
                setName(checklist.title);
                setDescription(checklist.description);
                setImageURL(checklist.thumbnailImage);
                if (checklist.checkpoints) {
                    setCheckpoints(
                        checklist.checkpoints.map((item) => {
                            return item.title;
                        })
                    );
                }
            })
            .then(() => setLoading(false));
    }, [id, loading]);
    return (
        <section className="editChecklist">
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
                {!loading && (
                    <ChecklistForm
                        submitText="edit"
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
                        submit={editCheckList}
                    />
                )}
            </div>
        </section>
    );
};

export default EditChecklist;
