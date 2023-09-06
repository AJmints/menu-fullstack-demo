package org.fullstack.menudemo.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class MenuEntity extends AbstractIdEntity{

    private String name;
    private Date lastUpdated;
    @Column(length = 3000, columnDefinition = "MEDIUMBLOB NOT NULL")
    private List<Long> menuItemIds;

    public MenuEntity() {
    }

    public MenuEntity(String name, Date date, ArrayList<Long> items) {
        super();
        this.name = name;
        this.lastUpdated = date;
        this.menuItemIds = items;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public void setMenuItemIds(ArrayList<Long> items) {
        this.menuItemIds = items;
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

    public List<Long> getMenuItemIds() {
        return menuItemIds;
    }
}
