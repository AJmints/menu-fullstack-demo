package org.fullstack.menudemo.controllers;


import org.fullstack.menudemo.models.MenuItemEntity;
import org.fullstack.menudemo.models.Response;
import org.fullstack.menudemo.models.dto.MenuItemDTO;
import org.fullstack.menudemo.models.dto.MenuOfTheDayDTO;
import org.fullstack.menudemo.repository.MenuItemRepository;
import org.fullstack.menudemo.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Controller
@CrossOrigin
@RequestMapping(value = "/restaurant")
public class RestaurantController {

    @Autowired
    MenuRepository menuRepository;
    @Autowired
    MenuItemRepository menuItemRepository;

    @GetMapping("/getMenu")
    public ResponseEntity<?> getTodaysMenu() {

        if (menuRepository.findAll().size() == 0) {
            Response response = new Response("No menu is available today");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        MenuOfTheDayDTO menuOfTheDayDTO = new MenuOfTheDayDTO();
        List<MenuItemDTO> menuItemFetch = new ArrayList<>();

        for (Long itemId : menuRepository.findAll().get(menuRepository.findAll().size() - 1).getMenuItemIds()) {
            for (MenuItemEntity menuItem : menuItemRepository.findAll()) {
                if (Objects.equals(menuItem.getId(), itemId)) {
                    MenuItemDTO menuItemDTO = new MenuItemDTO(menuItem.getName(), menuItem.getPrice(), menuItem.getDescription(), menuItem.getCategory(), menuItem.isNew());
                    menuItemFetch.add(menuItemDTO);
                }
            }
        }

        menuOfTheDayDTO.setName(menuRepository.findAll().get(menuRepository.findAll().size() - 1).getName());
        menuOfTheDayDTO.setLastUpdated(menuRepository.findAll().get(menuRepository.findAll().size() - 1).getLastUpdated());
        menuOfTheDayDTO.setMenuItems(menuItemFetch);

        return new ResponseEntity<>(menuOfTheDayDTO, HttpStatus.OK);
    }
}
