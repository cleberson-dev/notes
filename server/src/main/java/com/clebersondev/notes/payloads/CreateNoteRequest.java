package com.clebersondev.notes.payloads;

import javax.validation.constraints.NotBlank;

public class CreateNoteRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
