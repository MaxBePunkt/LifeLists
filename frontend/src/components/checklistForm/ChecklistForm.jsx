import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ChecklistForm = ({
    submitText,
    name,
    setName,
    description,
    setDescription,
    imageURL,
    setImageURL,
    oneCheckpoint,
    setOneCheckpoint,
    checkpoints,
    setCheckpoints,
    submit,
}) => {
    const handleSubmitCheckpoints = (e) => {
        e.preventDefault();
        setCheckpoints([...checkpoints, oneCheckpoint]);
        setOneCheckpoint("");
    };
    const handleDelete = (checkpoint) => {
        const newArray = checkpoints.filter((e) => {
            return e !== checkpoint;
        });
        setCheckpoints(newArray);
    };

    return (
        <div className="checklistForm">
            <Box
                className="formWrap"
                sx={{
                    width: 800,
                    maxWidth: "100%",
                    margin: "25px auto",
                }}
            >
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    focused={submitText === "edit"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    focused={submitText === "edit"}
                    maxRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Image URL"
                    name="imageURL"
                    fullWidth
                    focused={submitText === "edit"}
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                />

                <Box
                    className="checkpointWrap"
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmitCheckpoints}
                >
                    <TextField
                        label="Checkpoint"
                        name="checkpoint"
                        value={oneCheckpoint}
                        onChange={(e) => setOneCheckpoint(e.target.value)}
                        sx={{
                            width: "100%",
                        }}
                    />
                    <IconButton
                        size="large"
                        sx={{
                            width: "50px",
                            height: "50px",
                            marginLeft: "5px",
                        }}
                        onClick={handleSubmitCheckpoints}
                    >
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    width: 800,
                    maxWidth: "100%",
                    margin: "25px auto",
                }}
            >
                {checkpoints.map((checkpoint, i) => (
                    <Paper
                        key={i}
                        variant="outlined"
                        sx={{
                            // width: 800,
                            maxWidth: "100%",
                            backgroundColor: "primary.black",
                            padding: "10px", // margin: "25px auto",
                        }}
                        onClick={() => handleDelete(checkpoint)}
                    >
                        <p>{checkpoint}</p>
                        <IconButton
                            size="large"
                            sx={{
                                width: "50px",
                                height: "50px",
                            }}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Paper>
                ))}
                <Button
                    variant="outlined"
                    color="success"
                    style={{
                        margin: "2% 0",
                        width: "100%",
                        padding: "10px",
                    }}
                    // size="medium"
                    onClick={submit}
                >
                    {submitText}
                </Button>
            </Box>
        </div>
    );
};

export default ChecklistForm;
