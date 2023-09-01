package org.fullstack.menudemo.repository;

import org.fullstack.menudemo.models.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
