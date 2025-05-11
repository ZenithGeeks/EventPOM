import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import Purchase from "./purchase"

type items = {
    id: string
    name: string
    description: string
    price: number
    quantity: number
    status: string
}

type props = {
    length: number
    items: items[]
    ticketCount: { [key: string]: number }
    total: number
    loading: boolean
    handle: () => void
}

export default function Cart({ length, items, ticketCount, total, loading, handle }: props) {
    return (
        <div className="border-borderColor border-[1px] p-[30px] h-fit rounded-[3px] space-y-[25px]">
            <div className="flex items-center space-x-[6px]">
                <h1 className="font-bold text-[18px]">Cart</h1>
                <ShoppingCartIcon className="w-[25px] h-[25px]" />
            </div>
            {length === 0 ? (
                <h1 className="text-[18px]">Your cart is currently empty</h1>
            ) : (
                <>
                    {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                            <h1 className="font-bold max-w-[200px] text-[18px] truncate">{item.name}</h1>
                            <h1 className="text-[18px]">{item.price.toLocaleString()} Baht.- [{ticketCount[item.id]}]</h1>
                        </div>
                    ))}
                </>
            )}
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-[18px]">Total</h1>
                <h1 className="font-bold text-[18px]">{total.toLocaleString()} Baht.-</h1>
            </div>
            <Purchase
                loading={loading}
                handle={handle}
                cartLength={length}
            />
        </div>
    )
}