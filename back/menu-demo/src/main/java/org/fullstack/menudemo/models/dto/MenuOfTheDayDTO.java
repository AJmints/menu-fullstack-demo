package org.fullstack.menudemo.models.dto;

import java.util.Date;
import java.util.List;

public class MenuOfTheDayDTO {

    private String name;
    private Date lastUpdated;
    private List<MenuItemDTO> menuItems;

    public MenuOfTheDayDTO() {
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

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public List<MenuItemDTO> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItemDTO> menuItems) {
        this.menuItems = menuItems;
    }
}
