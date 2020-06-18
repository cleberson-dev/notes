import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";

import AddIcon from "@material-ui/icons/Add";

import CreateNoteModal from "../components/CreateNoteModal";
import EditNoteModal from "../components/EditNoteModal";
import NoteModal from "../components/NoteModal";
import AppContext from "../utils/store";
import { noteSchema } from "../utils/validators";
import Joi from "@hapi/joi";

function Note({ title, content, onClick }) {
  return (
    <Box
      width="20%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="wrap"
      mb={3}
      mr={3}
      onClick={onClick}
    >
      <Paper>
        <Box p={2} bgcolor="warning.light">
          <Box whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
          <Typography align="left" variant="h5">
            {title}
          </Typography>
          </Box>
          <Typography align="left" variant="body1">
            <Box maxHeight="10rem" width="100%">
              {content}
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

function MainPage() {
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [currentEditNote, setCurrentEditNote] = useState(null);

  const [creationErrors, setCreationErrors] = useState(null);

  const { authCredential, alert, setAlert } = useContext(AppContext);

  function fireAlert(type, message, durationInMs = 5000) {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), durationInMs);
  }

  const authConfig = {
    headers: {
      Authorization: `Bearer ${authCredential.token}`,
    },
  };

  useEffect(() => {
    setLoadingNotes(true);
    axios
      .get("http://localhost:8080/api/notes", authConfig)
      .then((res) => {
        setNotes(res.data);
        setLoadingNotes(false);
      })
      .catch(console.error);
  }, []);

  const createNote = (title, setTitle, content, setContent) => {
    try {
      Joi.assert({ title, content }, noteSchema);
      axios
        .post("http://localhost:8080/api/notes", { title, content }, authConfig)
        .then((res) => {
          const { data: newNote } = res.data;
          setNotes([...notes, newNote]);
          setIsCreateNoteOpen(false);
          setTitle("");
          setContent("");
          fireAlert("success", "Anotação criada", 5000);
        })
        .catch((err) => {
          setIsCreateNoteOpen(false);
          fireAlert("error", "Falha ao criar anotação", 5000);
        });
    } catch (error) {
      const { details } = error;
      const errors = details.map(detail => ({ field: detail.path[0], type: detail.type }));
      console.log(errors);
      setCreationErrors(errors);
    }
  };

  return (
    <>
      {isCreateNoteOpen && (
        <CreateNoteModal
          onClose={() => setIsCreateNoteOpen(false)}
          onCreate={createNote}
          errors={creationErrors}
        />
      )}

      {currentEditNote && (
        <EditNoteModal
          noteToUpdate={currentEditNote}
          onClose={() => setCurrentEditNote(null)}
          onEdit={(title, content) => {
            axios
              .patch(
                `http://localhost:8080/api/notes/${currentEditNote.id}`,
                { title, content },
                authConfig
              )
              .then(({ data: body }) => {
                const { data: updatedNote } = body;
                setNotes(
                  notes.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                  )
                );
                setCurrentEditNote(null);
                setCurrentNote(null);
              })
              .catch(console.error);
          }}
        />
      )}

      {currentNote && (
        <NoteModal
          note={currentNote}
          onClose={() => setCurrentNote(null)}
          onEdit={() => setCurrentEditNote(currentNote)}
          onDelete={() => {
            axios
              .delete(
                `http://localhost:8080/api/notes/${currentNote.id}`,
                authConfig
              )
              .then((res) => {
                setNotes(notes.filter((note) => currentNote.id !== note.id));
                setCurrentNote(false);
                fireAlert("success", "Remoção ocorrida com sucesso", 5000);
              })
              .catch((err) => {
                fireAlert(
                  "error",
                  "Remoção ocorrida com sucesso: " + err.message,
                  5000
                );
              });
          }}
        />
      )}

      <Box mt={4}>
        <Box position="fixed" bottom={50} right={60}>
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => setIsCreateNoteOpen(true)}
          >
            <AddIcon />
          </Fab>
        </Box>

        {!loadingNotes ? (
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            component="ul"
            width="100%"
          >
            {notes.map((note) => (
              <Note
                key={note.id}
                {...note}
                onClick={() => setCurrentNote(note)}
              />
            ))}
          </Box>
        ) : (
          <Box
            width="100%"
            height="80vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={70} />
          </Box>
        )}
      </Box>
    </>
  );
}

export default MainPage;
