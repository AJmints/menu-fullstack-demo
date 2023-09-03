package org.fullstack.menudemo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;

@AllArgsConstructor
@Getter
public class MenuDTO {
    private String name;
    private ArrayList<String> items;
}
