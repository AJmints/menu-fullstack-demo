package org.fullstack.menudemo.repository;

import org.fullstack.menudemo.models.MenuItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenuItemRepository extends JpaRepository<MenuItemEntity, Long> {

    Optional<MenuItemEntity> findByName(String name);
}
