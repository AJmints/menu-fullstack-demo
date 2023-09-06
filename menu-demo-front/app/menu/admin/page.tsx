'use client'

import DisplayMenu from "@/components/update-menu/DisplayMenu";
import UpdateMenu from "@/components/update-menu/UpdateMenu";
import { useEffect, useState } from "react";

interface MenuItem {
  id: number, 
  name: string,
  price: number,
  description: string,
  category: string,
  new: boolean,
}

export default function MenuAdmin() {

  const webUrl: string = "http://localhost:8080"

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [menu, setMenu] = useState({});

  useEffect(function() {
      const getMenuItems = async() => {
          await fetch(webUrl + "/admin/getMenuItems")
          .then(res => res.json())
          .then(data => {
            setMenuItems(data);
          })
      }
      const getMenu = async() => {
        await fetch(webUrl + "/admin/getMenu")
        .then(res => res.json())
        .then(data => {
          setMenu(data);
        })
      }
      getMenu();
      getMenuItems();
  }, []);
    
    return (
      <main>
  
        <h1 className="text-center text-3xl">Menu Admin</h1>

        <DisplayMenu
        menu={menu}
        menuItems={menuItems}
        setMenu={setMenu}
        />

        <UpdateMenu 
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        setMenu={setMenu}
        />

        
      </main>
    )
  }
  