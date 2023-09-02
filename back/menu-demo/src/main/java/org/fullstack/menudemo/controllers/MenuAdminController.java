package org.fullstack.menudemo.controllers;

import org.fullstack.menudemo.models.MenuItem;
import org.fullstack.menudemo.models.Response;
import org.fullstack.menudemo.models.dto.MenuItemDTO;
import org.fullstack.menudemo.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(value = "/admin")
public class MenuAdminController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @PostMapping("/addMenuItem")
    public ResponseEntity<?> resendVerificationEmail(@RequestBody MenuItemDTO menuItemDTO) {

        MenuItem newItem = new MenuItem(menuItemDTO.getName(), menuItemDTO.getPrice(), menuItemDTO.getDescription(), menuItemDTO.getCategory(), menuItemDTO.isNew());

        menuItemRepository.save(newItem);


        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getMenu")
    public ResponseEntity<?> getMenuObj() {
        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/removeItem/{id}")
    public ResponseEntity<?> removeMenuItem(@PathVariable Long id) {
        Optional<MenuItem> remove = menuItemRepository.findById(id);

        if(remove.isPresent()) {
            menuItemRepository.delete(remove.get());
        }

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/updateItem/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody MenuItemDTO menuItemDTO) {

        Optional<MenuItem> updateMenuItem = menuItemRepository.findById(id);

        if(updateMenuItem.isPresent()) {
            updateMenuItem.get().setName(menuItemDTO.getName());
            updateMenuItem.get().setCategory(menuItemDTO.getCategory());
            updateMenuItem.get().setDescription(menuItemDTO.getDescription());
            updateMenuItem.get().setPrice(menuItemDTO.getPrice());
            updateMenuItem.get().setNew(menuItemDTO.isNew());
            menuItemRepository.save(updateMenuItem.get());
        } else {
            return 
        }

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

}
