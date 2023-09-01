'use client'

import { useEffect, useState } from "react";

export default function UpdateMenu(props: any) {

    const webUrl: string = "http://localhost:8080"

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string>("");

     

    

    async function handleSubmit(event: any) {
        event.preventDefault();

        const data = {
            name: String(event.target.name.value),
            description: String(event.target.description.value),
            category: String(event.target.category.value),
            price: Number(event.target.price.value),
            isNew: Boolean(true)
        }

        setIsLoading(true);

        const response = await fetch(webUrl + "/admin/addMenuItem", {
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

            console.log(data);

        })
    }




    return (
        <form onSubmit={handleSubmit}>
            <div className='flex my-2'>
                <label htmlFor='name'>Name: </label>
                <input className="rounded-md border-2" type='text' autoComplete='off' id='name' required minLength={3} maxLength={40} />
            </div>
            <div className='flex my-2'>
                <label htmlFor='description'>Description: </label>
                <input className="rounded-md border-2" type='text' autoComplete='on' id='description' required minLength={3} maxLength={40} />
            </div>
            <div className='flex my-2'>
                <label htmlFor='category'>Category: </label>
                <input className="rounded-md border-2" type='text' autoComplete='off' id='category' required minLength={3} maxLength={40} />
            </div>
            <div className='flex my-2'>
                <label htmlFor='price'>Price: </label>
                <input className="rounded-md border-2" type='text' autoComplete='on' id='price' />
            </div>
            <div className='flex my-2'>
                <label htmlFor='isNew'>Is it New: </label>
                <input className="rounded-md border-2" type='checkbox' autoComplete='on' id='isNew' />
            </div>
            
            {isLoading ? <p className='p-4 bg-gray-600 mt-6 rounded-lg w-36'>Adding Item to list...</p> : 
                        <button type='submit' className='p-2 bg-slate-400 mt-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-500'>
                        Add Item</button>}
        </form>
    )
}