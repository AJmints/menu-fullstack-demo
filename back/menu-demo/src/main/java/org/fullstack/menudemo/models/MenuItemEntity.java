package org.fullstack.menudemo.models;

import jakarta.persistence.*;

@Entity
public class MenuItemEntity extends AbstractIdEntity {

    private String name;
    private double price;
    private String description;
    private String category;
    private boolean isNew;

    public MenuItemEntity() {
    }
    public MenuItemEntity(String name, double price, String description, String category, boolean isNew) {
        super();
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.isNew = isNew;
    }

    public void setName(String name) { this.name = name; }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setNew(boolean aNew) {
        isNew = aNew;
    }


    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public boolean isNew() {
        return isNew;
    }
}
