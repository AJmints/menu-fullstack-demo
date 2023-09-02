'use client'

import {useState} from 'react'

export default function MenuItemCard(props: any) {

    let menuItem = props.item

    const [updateItem, setUpdateItem] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div>
        {updateItem ? 

        <form key={menuItem.id} onSubmit={props.updateItem}>
        
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
            <h1>Category: </h1>
            <input className="rounded-md border-2" type='text' autoComplete='off' id='category' defaultValue={props.item.category} required minLength={3} maxLength={40} />
        </div>
        <div className='my-2'>
            <h1>Price: </h1>
            <input className="rounded-md border-2" type='text' autoComplete='off' id='price' defaultValue={props.item.price} />
        </div>
        <div className='my-2'>
            <label htmlFor='isNew'>Is it New: </label>
            <input className="rounded-md border-2" type='checkbox' autoComplete='off' id='isNew' />
        </div>

        {isLoading ? <p className='p-4  mt-6 rounded-lg w-36'>Adding Item to list...</p> : 
                    <button type='submit' className='p-2 bg-green-500/80 mt-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-500'>
                    Update Item</button>}
        <button className="bg-red-500/80 p-2 rounded-md" onClick={() => setUpdateItem(prev => !prev)}>Cancel</button>
        </form>
        
        :
        
        <div className="border-2 p-2 m-2" key={props.item.id}>
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