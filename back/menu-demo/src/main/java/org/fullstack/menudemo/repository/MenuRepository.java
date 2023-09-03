package org.fullstack.menudemo.repository;

import org.fullstack.menudemo.models.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {

}
