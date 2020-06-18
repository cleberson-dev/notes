import React, { useState, useContext } from "react";

import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/NoteAdd";

import AppContext from "../utils/store";

const Field = (props) => (
  <Box mb={2}>
    <TextField {...props} fullWidth={true} />
  </Box>
);

const FormButton = (props) => (
  <Box>
    <Button {...props}>{props.children}</Button>
  </Box>
);

function CreateNoteModal({ isOpen = true, onClose, onCreate, errors }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  let titleError;
  let contentError;

  if (Boolean(errors)) {
    titleError = errors.find(err => err.field === "title");
    contentError = errors.find(err => err.field === "content");
  }

  const errorMessages = {
    ["string.empty"]: 'Campo obrigatório. Por favor, preencha.' 
  };

  const createNote = () => {
    setLoading(true);

    onCreate(title, setTitle, content, setContent);

    setLoading(false);
  };

  return (
    <Modal open>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        
      >
        <Box
          position="relative"
          bgcolor="white"
          width="50%"
          component="form"
          p={3}
          display="flex"
          flexDirection="column"
        >
          <Box
            mb={2.5}
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Adicionar nova nota</Typography>
            <IconButton onClick={onClose} color="secondary">
              <CloseIcon />
            </IconButton>
          </Box>
          <Field
            label="Título"
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            value={title}
            error={Boolean(errors) && Boolean(titleError)}
            helperText={Boolean(errors) && Boolean(titleError) && errorMessages[titleError.type]}
          />
          <Field
            label="Conteúdo"
            multiline
            rows={10}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            value={content}
            error={Boolean(errors) && Boolean(contentError)}
            helperText={Boolean(errors) && Boolean(contentError) && errorMessages[contentError.type]}
          />
          <FormButton
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={createNote}
          >
            Criar
          </FormButton>

          {loading && (
            <Box 
                width="100%" height="100%" 
                position="absolute" top={0} left={0}
                display="flex" justifyContent="center" alignItems="center"
                bgcolor="white"
                zIndex="modal"
            >
              <CircularProgress size={70} />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateNoteModal;
