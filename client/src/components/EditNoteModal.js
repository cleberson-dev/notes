import React, { useState, useContext } from 'react';

import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

import AppContext from '../utils/store';

const errorMessages = {
    empty: 'Campo vazio. Insira n caracteres'
};


    
const Field = props => (
    <Box mb={2}>
        <TextField 
            {...props}
            fullWidth={true}
        />
    </Box>
);

const FormButton = props => (
    <Box>
        <Button {...props}>{props.children}</Button>
    </Box>
);

function EditNoteModal({ 
    onClose, 
    onEdit,
    noteToUpdate,
    errors
}) {
    const [title, setTitle] = useState(noteToUpdate.title);
    const [content, setContent] = useState(noteToUpdate.content);

    const editNote = () => {
        onEdit(title, content);
        
        setTitle('');
        setContent('');
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
                <Box bgcolor="white" width="50%" component="form" p={3} display="flex" flexDirection="column">
                    <Box mb={2.5} width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Atualize a anotação</Typography>
                        <IconButton onClick={onClose} color="secondary"><CloseIcon /></IconButton>
                    </Box>
                    <Field 
                        label="Título"
                        onChange={e => setTitle(e.target.value)}
                        variant="outlined"
                        value={title}
                        error={errors && errors.title}
                        helperText={errors && errors.title && errorMessages[errors.title]}
                    />
                    <Field 
                        label="Conteúdo"
                        multiline
                        rows={10}
                        onChange={e => setContent(e.target.value)}
                        variant="outlined"
                        value={content}
                        error={errors && errors.title}
                        helperText={errors && errors.title && errorMessages[errors.title]}
                    />
                    <FormButton
                        startIcon={<EditIcon />}
                        variant="contained"
                        color="secondary"
                        onClick={editNote}
                    >
                        Atualizar
                    </FormButton>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditNoteModal;