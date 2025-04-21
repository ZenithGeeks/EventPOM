import { CreditCardIcon } from "@heroicons/react/24/outline"

type props = {
    loading: boolean
    handle: () => void
    cartLength: number
}

export default function Purchase({ loading, handle, cartLength }: props) {
    return (
        <div
            className={`flex items-center justify-center rounded-[3px] w-[200px] h-[50px] ${loading || cartLength === 0 ? 'bg-borderColor' : 'bg-primaryColor cursor-pointer'}`}
            onClick={loading || cartLength === 0 ? undefined : handle}
        >
            <div className="flex items-center space-x-[6px]">
                <h1 className="text-white text-[16px]">Purchase</h1>
                <CreditCardIcon className="text-white w-[25px] h-[25px]" />
            </div>
        </div>
    )
}