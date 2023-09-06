'use client'

import { useEffect, useState } from "react";

interface MenuItem {
    id: number, 
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
  }

export default function CreateNewMenu(props: any) {

    const webUrl: string = "http://localhost:8080"
    const selectedValues: any = []
    const [isLoading, setIsLoading] = useState<boolean>(false);


    async function handleSubmit(event: any) {
        event.preventDefault();

        const data = {
            name: String(event.target.name.value),
            items: (props.updateMenu),
        }

        setIsLoading(true);

        await fetch(webUrl + "/admin/createMenu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then(data => {
            setIsLoading(prev => !prev);

            event.target.name.value = ""
            props.setMenu(data)
            props.setUpdateMenu([])

        })
    }

    const handleSelection = (event: any) => {
        event.preventDefault();
        if(event.target.value != '') {
            props.setUpdateMenu([...props.updateMenu, event.target.value])
        }
    }

    const items = props.menuItems.sort(function(a:any, b:any) {
       if(a.name < b.name) {
        return -1;
       }
       if(a.name > b.name) {
        return 1;
       }
       return 0;
    }).map((item: any) => 
        <option key={item.id} value={item.name}>{item.name}</option>
    )


    return (
        <div>
        <form onSubmit={handleSubmit}>
                <h1>Create New Menu</h1><br/>

                <div className=''>
                    <h1>New Menu Name: </h1>
                    <input className="rounded-md border-2" type='text' autoComplete='off' id='name' required minLength={3} maxLength={40} />
                </div><br/>
                <div className=''>
                    <h1>Add Item:</h1>
                    <select multiple={true} className="rounded-md border-2" value={selectedValues} onChange={handleSelection} id="addItem">
                        {/* <option value="DEFAULT" disabled >Select Items to Add</option> */}
                        {items}
                    </select>
                </div>
                
                {isLoading ? <p className='p-4 bg-gray-600 mt-6 rounded-lg w-36'>Creating New Menu...</p> : 
                            <button type='submit' className='p-2 bg-green-500/80 mt-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-500'>
                            Create New Menu</button>}
            </form>
        </div>
    )
}