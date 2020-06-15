package com.clebersondev.notes.repositories;

import com.clebersondev.notes.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findById(Long id);

    @Query("SELECT n FROM Note n WHERE n.author.id = :userId")
    List<Note> findByUserId(@Param("userId") Long userId);
}
