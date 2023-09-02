'use client'

import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";

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

    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            props.setMenu(data);

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
            props.setMenu(data);

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
            props.setMenu(data);

            event.target.name.value = ""
            event.target.description.value = ""
            event.target.category.value = ""
            event.target.price.value = ""
            event.target.isNew.checked = false

        })
    }

    const allItems = props.menu.map((item: MenuItem) => (
        <MenuItemCard
        key={item.id}
        item={item}
        removeItem={removeItem}
        updateItem={updateItem}
        />
      ))


    return (
        <div>

            <div className="flex ml-5">
            <form onSubmit={handleSubmit}>
                <div className='my-2'>
                    <h1>Name: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='off' id='name' required minLength={3} maxLength={40} />
                </div>
                <div className='my-2'>
                    <h1>Description: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='on' id='description' required minLength={3} maxLength={40} />
                </div>
                <div className='my-2'>
                    <h1>Category: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='off' id='category' required minLength={3} maxLength={40} />
                </div>
                <div className='my-2'>
                    <h1>Price: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='on' id='price' />
                </div>
                <div className='my-2'>
                    <label htmlFor='isNew'>Is it New: </label>
                    <input className="rounded-md border-2" type='checkbox' autoComplete='on' id='isNew' />
                </div>
                
                {isLoading ? <p className='p-4 bg-gray-600 mt-6 rounded-lg w-36'>Adding Item to list...</p> : 
                            <button type='submit' className='p-2 bg-slate-400 mt-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-500'>
                            Add Item</button>}
            </form>
            </div>

            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 ">
            {allItems}
            </div>

        </div>
    )
}