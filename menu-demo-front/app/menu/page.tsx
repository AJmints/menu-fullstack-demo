'use client'

import DisplayMenuItems from "@/components/update-menu/DisplayMenuItems";
import { useEffect, useState } from "react"

interface MenuOfTheDay {
  name: string,
  lastUpdated: string,
  menuItems: any[],
}

export default function TodaysMenu() {

  const webUrl: string = "http://localhost:8080"
  let item: MenuOfTheDay = {
    name: "",
    lastUpdated: "",
    menuItems: [],
  };
  const [currentMenu, setCurrentMenu] = useState<MenuOfTheDay>(item);
  const [menuItems, setMenuItems] = useState<any[]>([])

  useEffect(function() {
    const getMenuItems = async() => {
      await fetch(webUrl + "/admin/getMenuItems")
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
      })
  }
      const getCurrentMenu = async() => {
        await fetch(webUrl + "/admin/getMenu")
        .then(res => res.json())
        .then(data => {
          setCurrentMenu(data);
        })
      }
      getMenuItems();
      getCurrentMenu();
  }, [])

  const items = currentMenu.menuItems?.map((menuItem: any) => {
    console.log(menuItem)
    return (
      <tr key={menuItem.name} className="">
        <td>{menuItem.category === "Appetizer" ? menuItem.name : ""}</td>
        <td>{menuItem.category === "Breakfast" ? menuItem.name : ""}</td>
        <td>{menuItem.category === "Lunch" ? menuItem.name : ""}</td>
        <td>{menuItem.category === "Dinner" ? menuItem.name : ""}</td>
        <td>{menuItem.category === "Dessert" ? menuItem.name : ""}</td>
        <td>{menuItem.category === "Drinks" ? menuItem.name : ""}</td>
      </tr>
      )
  }
    
)


    return (
      <main>
  
        <h1>Todays Menu</h1><br/>

        <h1 className="text-4xl">Current Menu: {currentMenu.name}</h1>
            <h1>Menu Created: {currentMenu.lastUpdated}</h1><br/>

            <DisplayMenuItems
            currentMenu={currentMenu}
            menuItems={menuItems} 
            />
  
      </main>
    )
  }
  