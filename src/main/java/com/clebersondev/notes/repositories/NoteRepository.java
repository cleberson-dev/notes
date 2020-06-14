package com.clebersondev.notes.repositories;

import com.clebersondev.notes.models.Note;
import com.clebersondev.notes.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findById(Long id);

    Optional<Note> findByAuthor(User author);
}
