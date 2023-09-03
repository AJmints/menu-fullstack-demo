'use client'

import { useEffect, useState } from 'react';

interface MenuItem {
    id: number, 
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
  }

export default function DisplayMenu(props: any) {

    const webUrl:string = 'http://localhost:8080'

    const [allMenus, setAllMenus] = useState<any[]>([])

    useEffect(function() {
        const getMenu = async() => {
            await fetch(webUrl + "/admin/getMenus")
            .then(res => res.json())
            .then(data => {
              setAllMenus(data);
            })
          }
          getMenu();
    }, [])

    const removeMenu = (itemId: number) => {

        fetch(webUrl + "/admin/removeMenu/" + itemId, {
            method: "DELETE"
        }).then((response) => response.json()).then(data => {
            props.setMenu(data);

        })
    }

    const items = props.menu.items?.map((menuItems: MenuItem) => 
    <p key={menuItems.id}>{menuItems.name}</p>
)

    return (
        <div className='bg-gray-200'>
            <p className='text-xs'>** Currently, you must remove the current menu to delete items. Otherwise, foreign key constraints pop up </p>
            <h1>Current Menu: {props.menu.name}</h1><br/>
            {items}
            <br/>
            <button className='p-2 m-2 bg-red-500/80 rounded-md' onClick={() => removeMenu(props.menu.id)}>Remove This Menu</button>
        </div>
    )
}