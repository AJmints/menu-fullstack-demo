package org.fullstack.menudemo.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;

@Entity // You will learn about this in the coding events chapters
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // You will learn about this in the coding events chapters

    private Date lastUpdated;

    @OneToMany // You will learn about this in the SQL chapter
    private ArrayList<MenuItem> items;

    public Menu(Date date, ArrayList<MenuItem> items) {
        this.lastUpdated = date;
        this.items = items;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public void setItems(ArrayList<MenuItem> items) {
        this.items = items;
    }

    public Long getId() { return id; }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public ArrayList<MenuItem> getItems() {
        return items;
    }
}
