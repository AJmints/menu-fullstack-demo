package org.fullstack.menudemo.models;

import jakarta.persistence.*;

import java.util.Objects;

@MappedSuperclass
public abstract class AbstractIdEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    public Long getId() {
        return id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractIdEntity entity = (AbstractIdEntity) o;
        return id == entity.id;
    }
}
