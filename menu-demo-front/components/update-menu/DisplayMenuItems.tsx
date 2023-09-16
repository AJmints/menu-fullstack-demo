export default function DisplayMenuItems(props: any) {

    const appItems = props.currentMenu.menuItemIds?.map((menuItem: any) => {
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

    const breakfastItems = props.currentMenu.menuItemIds?.map((menuItem: any) => {
        if (props.menuItems.find((item: any) => item.id === menuItem) !== undefined) {
            let category = props.menuItems.find((item: any) => item.id === menuItem)
            return (
                <p>{category.category === "Breakfast" ? category.name : ""}</p>
            )
        }
    })

    const lunchItems = props.currentMenu.menuItemIds?.map((menuItem: any) => {
        if (props.menuItems.find((item: any) => item.id === menuItem) !== undefined) {
            let category = props.menuItems.find((item: any) => item.id === menuItem)
            return (
                <p>{category.category === "Lunch" ? category.name : ""}</p>
            )
        }
    })

    const dinnerItems = props.currentMenu.menuItemIds?.map((menuItem: any) => {
        if (props.menuItems.find((item: any) => item.id === menuItem) !== undefined) {
            let category = props.menuItems.find((item: any) => item.id === menuItem)
            return (
                <p>{category.category === "Dinner" ? category.name : ""}</p>
            )
        }
    })

    const dessertItems = props.currentMenu.menuItemIds?.map((menuItem: any) => {
        if (props.menuItems.find((item: any) => item.id === menuItem) !== undefined) {
            let category = props.menuItems.find((item: any) => item.id === menuItem)
            return (
                <p>{category.category === "Dessert" ? category.name : ""}</p>
            )
        }
    })

    const drinkItems = props.currentMenu.menuItemIds?.map((menuItem: any) => {
        if (props.menuItems.find((item: any) => item.id === menuItem) !== undefined) {
            let category = props.menuItems.find((item: any) => item.id === menuItem)
            return (
                <p>{category.category === "Drinks" ? category.name : ""}</p>
            )
        }
    })


    return (
        <div className='bg-gray-100 flex space-x-2'>
                <div>
                <h1 className=' font-medium text-lg'>Appetizers</h1>
                <ol>
                {appItems}
                </ol>
                </div>

                <div>
                <h1 className=' font-medium text-lg'>Breakfast</h1>
                <ol>
                {breakfastItems}
                </ol>
                </div>

                <div>
                <h1 className=' font-medium text-lg'>Lunch</h1>
                <ol>
                {lunchItems}
                </ol>
                </div>

                <div>
                <h1 className=' font-medium text-lg'>Dinner</h1>
                <ol>
                {dinnerItems}
                </ol>
                </div>

                <div>
                <h1 className=' font-medium text-lg'>Desserts</h1>
                <ol>
                {dessertItems}
                </ol>
                </div>

                <div>
                <h1 className=' font-medium text-lg'>Drinks</h1>
                <ol>
                {drinkItems}
                </ol>
                </div>
            </div>
    )
}