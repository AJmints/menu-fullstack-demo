'use client'

import {useState} from 'react'

interface MenuItem {
    id: number, 
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
  }

export default function MenuItemCard(props: any) {

    let webUrl: string = "http://localhost:8080"
    let menuItem: MenuItem = props.item

    const [updateItem, setUpdateItem] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateItemHandle = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

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

            setIsLoading(prev => !prev);
            setUpdateItem(prev => !prev)
            

        })
    }

    return (
        <div>
        {updateItem ? 

        <div className='flex justify-center border-2 m-2'>
        <form key={menuItem.id} onSubmit={updateItemHandle}>
        
        <input type="hidden" id="id" defaultValue={menuItem.id}></input>
        <div className='my-2'>
            <h1>Name: </h1>
            <input className="rounded-md border-2" type='text' autoComplete='off' id='name' defaultValue={props.item.name} required minLength={3} maxLength={40} />
        </div>
        <div className='my-2'>
            <h1>Description: </h1>
            <input className="rounded-md border-2" type='text' autoComplete='off' id='description' defaultValue={props.item.description} required minLength={3} maxLength={40} />
        </div>
        <div className='my-2'>
            <h1>Category</h1>
            <select className="rounded-md border-2" defaultValue={props.item.category} id="category">
                <option value="default" disabled>Select meal Type</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Drinks">Drinks</option>
            </select>
        </div>
        <div className='my-2'>
            <h1>Price: </h1>
            <input className="rounded-md border-2" type='text' value={props.item.price} autoComplete='off' id='price' defaultValue={props.item.price} />
        </div>
        <div className='my-2'>
            <label htmlFor='isNew'>Is it New: </label>
            <input className="rounded-md border-2" type='checkbox' checked={props.item.isNew} autoComplete='off' id='isNew' />
        </div>

        {isLoading ? <p className='p-4  mt-6 rounded-lg w-36'>Adding Item to list...</p> : 
                    <button type='submit' className='p-2 bg-green-500/80 mt-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-500'>
                    Update Item</button>}
        <button className="bg-red-500/80 p-2 rounded-md" onClick={() => setUpdateItem(prev => !prev)}>Cancel</button>
        </form>
        </div>
        
        :
        
        <div className="border-2 p-2 m-2" key={props.item.id}>
        <p>Id: {props.item.id}</p>
          <p>Name: {props.item.name}</p>
          <p>Description: {props.item.description}</p>
          <p>Category: {props.item.category}</p>
          <p>Price: {props.item.price}</p>
          <p>New: {props.item.new ? "true" : "false"}</p>
          <button className="bg-red-500/80 p-2 rounded-md" onClick={() => props.removeItem(props.item.id)}>Delete</button>
          <button className="bg-green-500/80 p-2 rounded-md" onClick={() => setUpdateItem(prev => !prev)}>Update Item</button>
        </div>}

        </div>
    )
}