package org.fullstack.menudemo.repository;

import org.fullstack.menudemo.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
