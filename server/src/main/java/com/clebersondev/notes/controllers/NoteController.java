package com.clebersondev.notes.controllers;

import com.clebersondev.notes.exceptions.AppException;
import com.clebersondev.notes.exceptions.BadRequestException;
import com.clebersondev.notes.models.Note;
import com.clebersondev.notes.models.User;
import com.clebersondev.notes.payloads.*;
import com.clebersondev.notes.repositories.NoteRepository;
import com.clebersondev.notes.repositories.UserRepository;
import com.clebersondev.notes.security.CurrentUser;
import com.clebersondev.notes.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<NoteResponse> getNotes(@CurrentUser UserPrincipal currentUser) {
        List<Note> notes = noteRepository.findByUserId(currentUser.getId());

        return notes
                .stream()
                .map(note -> new NoteResponse(note.getId(), note.getTitle(), note.getContent()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{noteId}")
    public NoteResponse getNoteById(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable Long noteId
    ) {
        Note note = noteRepository
                .findById(noteId)
                .orElseThrow(() -> new BadRequestException("Note not found"));

        if (note.getAuthor().getId() != currentUser.getId()) {
            throw new BadRequestException("Note not found");
        }

        return new NoteResponse(note.getId(), note.getTitle(), note.getContent());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createNote(
            @CurrentUser UserPrincipal currentUser,
            @Valid @RequestBody CreateNoteRequest createNoteRequest
    ) {
        User author = userRepository
                .findById(currentUser.getId())
                .orElseThrow(() -> new AppException("Current User not found"));

        Note newNote = new Note(
                createNoteRequest.getTitle(),
                createNoteRequest.getContent(),
                author
        );

        Note createdNote = noteRepository.save(newNote);

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(new ApiResponseWithData<NoteResponse>(
                        true,
                        "Note created",
                        new NoteResponse(
                                createdNote.getId(),
                                createdNote.getTitle(),
                                createdNote.getContent()
                        )));
    }

    @PatchMapping("/{noteId}")
    public ResponseEntity<ApiResponse> updateNote(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable Long noteId,
            @RequestBody EditNoteRequest editNoteRequest
    ) {
        Note noteToUpdate = noteRepository
                .findById(noteId)
                .orElseThrow(() -> new BadRequestException("Note not found"));

        // Is the note from the authenticated user ?
        if (noteToUpdate.getAuthor().getId() != currentUser.getId()) {
            throw new BadRequestException("Note not found");
        }


        if(editNoteRequest.getTitle() != null && !editNoteRequest.getTitle().isEmpty()) {
            noteToUpdate.setTitle(editNoteRequest.getTitle());
        }

        if (editNoteRequest.getContent() != null && !editNoteRequest.getContent().isEmpty()) {
            noteToUpdate.setContent(editNoteRequest.getContent());
        }

        Note updatedNote = noteRepository.save(noteToUpdate);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponseWithData<NoteResponse>(
                        true,
                        "Note updated",
                        new NoteResponse(
                                updatedNote.getId(),
                                updatedNote.getTitle(),
                                updatedNote.getContent()
                        )
                ));
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<ApiResponse> deleteNote(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable Long noteId
    ) {
        Note note = noteRepository
                .findById(noteId)
                .orElseThrow(() -> new BadRequestException("Note not found"));

        // Is the note from the authenticated user ?
        if (note.getAuthor().getId() != currentUser.getId()) {
            throw new BadRequestException("Note not found");
        }

        noteRepository.delete(note);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(true, "Note successfully removed."));
    }
}
