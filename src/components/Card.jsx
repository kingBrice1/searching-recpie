import React, { useState } from "react";

export default function Card(props) {
    //code
    let { title, instructions, servings,ingredients } = props
    return (
        <section className="w-[80%]  flex justify-center mx-auto mt-4">
            <div className="w-[50%] bg-[#FA8072] rounded-lg shadow-sm shadow-blue-300">
                <h1 className=" text-center text-3xl font-semibold pt-2">{title}</h1>
                <h1 className="pl-4 text-xl font-semibold">ingredients:</h1>
                <p className="pt-2 px-4 font-medium pb-4 text-slate-900">{ingredients}</p>
                <h1 className="pl-4 text-xl font-semibold ">recpie:</h1>
                <p className="pt-2 px-4 font-medium pb-4 text-slate-900 ">{instructions}</p>
                <h1 className="pl-4 text-xl font-semibold">serving:</h1>
                <p className="pt-2 px-4 font-medium pb-4 text-slate-900 ">{servings}</p>
            </div>
        </section>
    )
}