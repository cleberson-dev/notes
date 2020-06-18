import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";

import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

function NoteModal({ note, onClose, onEdit, onDelete }) {
  return ( 
    <Modal open>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >


        <Box minWidth="40%" maxWidth="80%" position="relative">
          <Paper>
            <Box bgcolor="warning.light" p={3}>
              <Typography variant="h3">{note.title}</Typography>
              <Box mt={2}>
                <Typography variant="body1" align="justify">{note.content}</Typography>
            </Box>
              <Box display="flex" mt={2} justifyContent="flex-end">
                <IconButton onClick={() => onEdit(note)}><EditIcon fontSize="small" /></IconButton>
                <IconButton onClick={onDelete}><RemoveIcon fontSize="small" /></IconButton>
              </Box>
            </Box>
          </Paper>


          <Box position="absolute" top={5} right={10}>
            <IconButton onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </Box>


        </Box>
      </Box>
    </Modal>
  );
}

export default NoteModal;
