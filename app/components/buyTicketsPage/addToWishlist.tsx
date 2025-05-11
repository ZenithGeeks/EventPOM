'use client'

import { BookmarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Add() {
    const [isBookmarked, setIsBookmarked] = useState(false)

    return (
        <div
            className="bg-primaryColor cursor-pointer flex items-center justify-center rounded-[3px] w-[200px] h-[50px]"
            onClick={() => setIsBookmarked(!isBookmarked)}
        >
            <div className="flex items-center space-x-[6px]">
                <h1 className="text-white text-[16px]">Add to wishlist</h1>
                <BookmarkIcon className={`text-white transition duration-150 w-[25px] h-[25px] ${isBookmarked ? 'fill-white' : 'fill-transparent'}`} />
            </div>
        </div>
    )
}