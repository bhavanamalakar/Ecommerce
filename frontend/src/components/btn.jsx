import React from "react";
import Link from "next/link";
export default function Btn({name, url}) {
    return (
        <>
            <li>
                <Link href={url}>{name}</Link>
            </li></>
    )
}