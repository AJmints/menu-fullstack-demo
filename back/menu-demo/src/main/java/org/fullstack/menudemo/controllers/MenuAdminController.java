package org.fullstack.menudemo.controllers;

import org.fullstack.menudemo.models.MenuEntity;
import org.fullstack.menudemo.models.MenuItemEntity;
import org.fullstack.menudemo.models.dto.MenuDTO;
import org.fullstack.menudemo.models.dto.MenuItemDTO;
import org.fullstack.menudemo.repository.MenuItemRepository;
import org.fullstack.menudemo.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(value = "/admin")
public class MenuAdminController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private MenuRepository menuRepository;


    /** Menu Item methods **/
    /** Menu Item methods **/
    /** Menu Item methods **/
    @PostMapping("/addMenuItem")
    public ResponseEntity<?> resendVerificationEmail(@RequestBody MenuItemDTO menuItemDTO) {

        MenuItemEntity newItem = new MenuItemEntity(menuItemDTO.getName(), menuItemDTO.getPrice(), menuItemDTO.getDescription(), menuItemDTO.getCategory(), menuItemDTO.isNew());

        menuItemRepository.save(newItem);

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getMenuItems")
    public ResponseEntity<?> getMenuObj() {
        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/removeItem/{id}")
    public ResponseEntity<?> removeMenuItem(@PathVariable Long id) {
        Optional<MenuItemEntity> remove = menuItemRepository.findById(id);

        if(remove.isPresent()) {
            menuItemRepository.delete(remove.get());
        }

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/updateItem/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody MenuItemDTO menuItemDTO) {

        Optional<MenuItemEntity> updateMenuItem = menuItemRepository.findById(id);

        if(updateMenuItem.isPresent()) {
            updateMenuItem.get().setName(menuItemDTO.getName());
            updateMenuItem.get().setCategory(menuItemDTO.getCategory());
            updateMenuItem.get().setDescription(menuItemDTO.getDescription());
            updateMenuItem.get().setPrice(menuItemDTO.getPrice());
            updateMenuItem.get().setNew(menuItemDTO.isNew());
            menuItemRepository.save(updateMenuItem.get());
        }

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    /** Menu methods **/
    /** Menu methods **/
    /** Menu methods **/

    @GetMapping("/getMenu")
    public ResponseEntity<?> getMostRecentMenu() {
        if(menuRepository.findAll().size() != 0) {
            MenuEntity currentMenuEntity = menuRepository.findAll().get(menuRepository.findAll().size() - 1);
            return new ResponseEntity<>(currentMenuEntity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(menuRepository.findAll(), HttpStatus.OK);
        }
    }

    @GetMapping("/getMenus")
    public ResponseEntity<?> getMenus() {
        return new ResponseEntity<>(menuRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createMenu")
    public ResponseEntity<?> createNewMenu(@RequestBody MenuDTO menuDTO) {

        ArrayList<MenuItemEntity> createMenu = new ArrayList<>();

        for(String item : menuDTO.getItems()) {
            Optional<MenuItemEntity> itemPresent = menuItemRepository.findByName(item);
            if(itemPresent.isPresent() && !createMenu.contains(itemPresent.get())) {
                createMenu.add(itemPresent.get());
            }
        }

        MenuEntity newMenuEntity = new MenuEntity(menuDTO.getName(), new Date(), createMenu);
        menuRepository.save(newMenuEntity);


        return new ResponseEntity<>(menuRepository.findAll().get(menuRepository.findAll().size() - 1), HttpStatus.OK);
    }

    @DeleteMapping("/removeMenu/{id}")
    public ResponseEntity<?> removeMenu(@PathVariable Long id) {
        Optional<MenuEntity> remove = menuRepository.findById(id);

        if(remove.isPresent()) {
            menuRepository.delete(remove.get());
        }

        return new ResponseEntity<>(menuRepository.findAll().get(menuRepository.findAll().size() - 1), HttpStatus.OK);
    }



}
