package com.example.library.util;

import org.springframework.stereotype.Component;

import com.example.library.model.Book;
import com.example.library.service.BookService;

import jakarta.annotation.PostConstruct;

@Component
public class BookFiller {
    private final BookService bookService;

    public BookFiller(BookService bookService) {
        this.bookService = bookService;
    }

    @PostConstruct
    public void init() {
        Book book1 = new Book("La comunidad del anillo", "Primer libro del seor de los anillos", "J. R. Tolkien");
        bookService.addBook(book1);
        try { Thread.sleep(1000); } catch (InterruptedException e) { }

        Book book2 = new Book("Las dos torres", "Segundo libro del seor de los anillos", "J. R. Tolkien");
        bookService.addBook(book2);
        try { Thread.sleep(1000); } catch (InterruptedException e) { }

        Book book3 = new Book("El retorno del rey", "Último libro del seor de los anillos", "J. R. Tolkien");
        bookService.addBook(book3);
    }
    
}
