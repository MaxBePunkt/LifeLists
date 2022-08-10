import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api.js";

const DetailList = ({ setCheckLists, checkLists }) => {
    const { id } = useParams();
    const [checklist, setChecklist] = useState({});
    let navigate = useNavigate();

    const toggleCheckpoint = (checkpointId, status) => {
        fetch(apiBaseUrl + "/list/toggle", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listId: id,
                checkpointId: checkpointId,
                status: status,
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => setChecklist(data));
    };

    const resetCheckList = () => {
        fetch(apiBaseUrl + "/list/reset", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listId: id,
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => setChecklist(data));

        // const newChecklist = {
        //     ...checklist,
        //     checkpoints: checklist.checkpoints.map((point) => ({
        //         ...point,
        //         checked: false,
        //     })),
        // };
        // setChecklist(newChecklist);
    };

    useEffect(() => {
        fetch(apiBaseUrl + "/list/one/" + id)
            .then((res) => res.json())
            .then((listArray) => setChecklist(listArray));
    }, [id]);
    return (
        <section className="detaillist">
            <article className="headerWrap">
                <img
                    src={
                        checklist.thumbnailImage ||
                        "https://ha-lehmann.at/wp-content/uploads/2020/06/placeholder.png"
                    }
                    alt={checklist.title}
                />
                <h2>{checklist.title}</h2>
            </article>
            <div className="wrap">
                <article className="detaillist__list">
                    <div className="buttonWrap">
                        <Button
                            variant="contained"
                            style={{
                                color: "var(--clr-blue-medium)",
                                backgroundColor: "var(--clr-blue-light)",
                            }}
                            size="medium"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                        <Button
                            variant="outlined"
                            style={{
                                color: "var(--clr-blue-medium)",
                                border: "1px solid var(--clr-blue-medium)",
                            }}
                            onClick={resetCheckList}
                        >
                            Reset Checklist
                        </Button>
                    </div>
                    {checklist.checkpoints &&
                        checklist.checkpoints.map((point) => (
                            <div
                                className={
                                    point.checked
                                        ? "detaillist__list__item active"
                                        : "detaillist__list__item"
                                }
                                key={point.id}
                                onClick={() => {
                                    toggleCheckpoint(point.id, point.checked);
                                }}
                            >
                                <input
                                    type="checkbox"
                                    id={id}
                                    checked={point.checked}
                                    readOnly
                                />
                                <span>{point.title}</span>
                            </div>
                        ))}
                </article>
            </div>
        </section>
    );
};

export default DetailList;
