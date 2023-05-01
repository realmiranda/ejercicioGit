package com.example.library.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public @Data class Book {
    private String bookId;
    private String title;
    private String description;
    private String author;
    public Book(String title, String description, String author) {
        this.title = title;
        this.description = description;
        this.author = author;
    }
    
}
