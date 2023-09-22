'use client'
import React from "react";
import Chat from "@/components/chatui";

const Node = () => {

    const [search, setSearch] = React.useState('')

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };
    return (
        <div className="w-screen h-screen">
            <div
                class="absolute inset-0 h-full w-full bg-[#091f12] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="my-8">
                    <Chat text={search} onChange={handleInputChange} onSubmit={() => { console.log("Abcd") }} onClear={() => { setSearch('') }} />
                </div>
            </div>
        </div>
    )
}

export default Node