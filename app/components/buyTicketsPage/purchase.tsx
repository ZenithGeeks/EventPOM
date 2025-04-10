import { CreditCardIcon } from "@heroicons/react/24/outline"

type props = {
    loading: boolean
    handle: () => void
}

export default function Purchase({ loading, handle }: props) {
    return (
        <div
            className={`flex items-center justify-center rounded-[3px] w-[200px] h-[50px] ${loading ? 'bg-borderColor' : 'bg-primaryColor cursor-pointer'}`}
            onClick={!loading ? handle : undefined}
        >
            <div className="flex items-center space-x-[6px]">
                <h1 className="text-white text-[16px]">Purchase</h1>
                <CreditCardIcon className="text-white w-[25px] h-[25px]" />
            </div>
        </div>
    )
}