'use client'

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

  const [menu, setMenu] = useState<MenuItem[]>([])

  useEffect(function() {
      const getMenu = async() => {
          await fetch(webUrl + "/admin/getMenu")
          .then(res => res.json())
          .then(data => {
            setMenu(data);
          })
      }    
      getMenu();
  }, []);
    
    return (
      <main>
  
        <h1>Menu Admin</h1>

        <UpdateMenu 
        menu={menu}
        setMenu={setMenu}
        />

        
      </main>
    )
  }
  