import { CreditCardIcon } from "@heroicons/react/24/outline"

export default function Purchase() {
    return (
        <div
            className="bg-primaryColor cursor-pointer flex items-center justify-center rounded-[3px] w-[200px] h-[50px]"
        >
            <div className="flex items-center space-x-[6px]">
                <h1 className="text-white text-[16px]">Purchase</h1>
                <CreditCardIcon className="text-white w-[25px] h-[25px]" />
            </div>
        </div>
    )
}