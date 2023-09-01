'use client'

import UpdateMenu from "@/components/update-menu/UpdateMenu";
import { useEffect, useState } from "react";

export default function MenuAdmin() {

    
    const webUrl: string = "http://localhost:8080"

    const [menu, setMenu] = useState([])

    useEffect(function() {
        const getMenu = async() => {
            await fetch(webUrl + "/admin/getMenu")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMenu(data);
            })
        }    
        getMenu();
    }, []);

    const allItems: any = menu.map((item: any) => (
        <p>{item.name}</p>
    ))
    
    return (
      <main className="bg-">
  
        <h1>Menu Admin</h1>

        <UpdateMenu 
        setMenu={setMenu}
        />

        {allItems}
  
      </main>
    )
  }
  