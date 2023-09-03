'use client'

import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import CreateNewMenu from "./CreateNewMenu";

interface MenuItem {
    id: number, 
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
  }

export default function UpdateMenu(props: any) {

    const webUrl: string = "http://localhost:8080"

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [updateMenu, setUpdateMenu] = useState<string[]>([])

    async function handleSubmit(event: any) {
        event.preventDefault();

        const data = {
            name: String(event.target.name.value),
            description: String(event.target.description.value),
            category: String(event.target.category.value),
            price: Number(event.target.price.value),
            isNew: Boolean(event.target.isNew.checked),
        }

        setIsLoading(true);

        await fetch(webUrl + "/admin/addMenuItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then(data => {
            setIsLoading(prev => !prev);
            props.setMenuItems(data);

            event.target.name.value = ""
            event.target.description.value = ""
            event.target.category.value = ""
            event.target.price.value = ""

        })
    }

    const removeItem = (itemId: number) => {

        fetch(webUrl + "/admin/removeItem/" + itemId, {
            method: "DELETE"
        }).then((response) => response.json()).then(data => {
            props.setMenuItems(data);

        })
    }

    const updateItem = (event: any) => {
        event.preventDefault();

        const data = {
            name: String(event.target.name.value),
            description: String(event.target.description.value),
            category: String(event.target.category.value),
            price: Number(event.target.price.value),
            isNew: Boolean(event.target.isNew.checked),
        }
        fetch(webUrl + "/admin/updateItem/" + event.target.id.value, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then(data => {
            props.setMenuItems(data);

            event.target.name.value = ""
            event.target.description.value = ""
            event.target.category.value = ""
            event.target.price.value = ""
            event.target.isNew.checked = false

        })
    }

    const allItems = props.menuItems.map((item: MenuItem) => (
        <MenuItemCard
        key={item.id}
        item={item}
        removeItem={removeItem}
        updateItem={updateItem}
        setMenuItems={props.setMenuItems}
        />
      ))


    return (
        <div>

            <div className="grid grid-cols-3">

            <div className="flex justify-center bg-gray-300">
            <form onSubmit={handleSubmit}>
                <h1>Create New Item</h1>
                <div className=''>
                    <h1>Name: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='off' id='name' required minLength={3} maxLength={40} />
                </div>
                <div className=''>
                    <h1>Description: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='on' id='description' required minLength={3} maxLength={40} />
                </div>
                <div className=''>
                    <h1>Category</h1>
                    <select className="rounded-md border-2" defaultValue="default" id="category">
                        <option value="default" disabled>Select meal Type</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drinks">Drinks</option>
                    </select>

                </div>
                <div className=''>
                    <h1>Price: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='on' id='price' />
                </div>
                <div className=''>
                    <label htmlFor='isNew'>Is it New: </label>
                    <input className="rounded-md border-2" type='checkbox' autoComplete='on' id='isNew' />
                </div>
                
                {isLoading ? <p className='p-4 bg-gray-600 mt-6 rounded-lg w-36'>Adding Item to list...</p> : 
                            <button type='submit' className='p-2 bg-slate-400 mt-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-500'>
                            Add Item</button>}
            </form>
            </div>

            <div className="flex justify-center bg-gray-400">
                <CreateNewMenu 
                menuItems={props.menuItems}
                updateMenu={updateMenu}
                setUpdateMenu={setUpdateMenu}
                setMenu={props.setMenu}
                />
            </div>

            <div className="flex justify-center bg-gray-500">
                <div>
                <h1>Items Selected for new menu:</h1><br/>
                <ol>
                {updateMenu.map((item: any) =>
                    <li key={item}>{"-" + item}</li>
                )}
                </ol>
                {updateMenu.length !== 0 && <button className="bg-red-500/80 p-2 rounded-md mt-3" onClick={() => setUpdateMenu([])}>Clear List</button>}
                </div>
            </div>

            </div>

            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 ">
            {allItems}
            </div>

        </div>
    )
}