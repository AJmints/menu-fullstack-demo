'use client'

import { it } from 'node:test';
import { useEffect, useState } from 'react';
import DisplayMenuItems from './DisplayMenuItems';

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
    let dropDownSelect = ""

    const [currentMenu, setCurrentMenu] = useState(props.menu)
    const [allMenus, setAllMenus] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(function() {
        const getMenu = async() => {
            await fetch(webUrl + "/admin/getMenus")
            .then(res => res.json())
            .then(data => {
              setAllMenus(data);
            })
          }
          const getCurrentMenu = async() => {
            await fetch(webUrl + "/admin/getMenu")
            .then(res => res.json())
            .then(data => {
              setCurrentMenu(data);
            })
          }
          getCurrentMenu();
          getMenu();
    }, [props.menu])

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (allMenus.find((menu: any) => menu.name === dropDownSelect) !== undefined) {
            setCurrentMenu(allMenus.find((menu: any) => menu.name === dropDownSelect))
        }
    }

    const removeMenu = (itemId: number) => {

        fetch(webUrl + "/admin/removeMenu/" + itemId, {
            method: "DELETE"
        }).then((response) => response.json()).then(data => {
            setCurrentMenu(data);
            setAllMenus(allMenus.filter((removedMenu: any) => removedMenu.id != itemId))
        })
    }

    const items = currentMenu.menuItemIds?.map((menuItem: any) => {

        if (props.menuItems.find((item: any) => item.id === menuItem) !== undefined) {
            let category = props.menuItems.find((item: any) => item.id === menuItem)
            return (
                <tr key={menuItem.id} className="">
                    <td key={menuItem.id}>{category.category === "Appetizer" ? category.name : ""}</td>
                    <td key={menuItem.id}>{category.category === "Breakfast" ? category.name : ""}</td>
                    <td key={menuItem.id}>{category.category === "Lunch" ? category.name : ""}</td>
                    <td key={menuItem.id}>{category.category === "Dinner" ? category.name : ""}</td>
                    <td key={menuItem.id}>{category.category === "Dessert" ? category.name : ""}</td>
                    <td key={menuItem.id}>{category.category === "Drinks" ? category.name : ""}</td>
                </tr>
            )
     // <p key={menuItem.id}>{props.menuItems.find((item: any) => item.id === menuItem).name}</p>
        } else {
            return <p key={menuItem.id}>This item does not / no longer exists.</p>
        }}
    )

    const appItems = currentMenu.menuItemIds?.map((menuItem: any) => {
        if (props.menuItems.find((item: any) => item.id === menuItem) !== undefined) {
            let category = props.menuItems.find((item: any) => item.id === menuItem)
            return (
                <p>{category.category === "Appetizer" ? category.name : ""}</p>
            )
        }
        return (
            <p>{menuItem}</p>
        )
    })

    const dropdownAllMenus = allMenus.map((item: any) => 
         <option key={item.id} value={item.name}>{item.name}</option>
     )

    return (
        <div className='bg-gray-200 p-4'>
            <form onSubmit={handleSubmit}>
                <div className='flex space-x-2'>
                    <h1>Select and View another Menu:</h1>
                    <select className="rounded-md border-2" defaultValue="default" onChange={(e) => dropDownSelect = e.target.value} id="menu">
                        <option value="default" disabled>Select Menu</option>
                        {dropdownAllMenus}
                    </select>

                    {isLoading ? <p className='p-4 bg-gray-600 rounded-md'>Loading Menu...</p> : 
                            <button type='submit' className='px-2 bg-slate-400 rounded-md shadow-lg hover:bg-yellow-400 transition duration-500'>
                            Select</button>}
                            
                </div>
            </form><br/>

            <h1 className='text-3xl'>Current Menu: {currentMenu.name}</h1>
            <h1>Menu Created: {currentMenu.lastUpdated}</h1><br/>
            
            <DisplayMenuItems
            currentMenu={currentMenu}
            menuItems={props.menuItems} 
            />

            <br/>
            <button className='p-2 m-2 bg-red-500/80 rounded-md' onClick={() => removeMenu(currentMenu.id)}>Remove This Menu</button>
        </div>
    )
}