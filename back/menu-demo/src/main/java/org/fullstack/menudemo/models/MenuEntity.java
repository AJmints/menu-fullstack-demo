package org.fullstack.menudemo.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class MenuEntity extends AbstractIdEntity{

    private String name;
    private Date lastUpdated;
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id")
    private List<MenuItemEntity> items;

    public MenuEntity() {
    }

    public MenuEntity(String name, Date date, ArrayList<MenuItemEntity> items) {
        super();
        this.name = name;
        this.lastUpdated = date;
        this.items = items;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public void setItems(ArrayList<MenuItemEntity> items) {
        this.items = items;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Date getLastUpdated() {
        return lastUpdated;
    }

    public List<MenuItemEntity> getItems() {
        return items;
    }
}
