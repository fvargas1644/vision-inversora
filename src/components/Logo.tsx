import { playfair_display, montserrat } from "@/app/fonts"

export default function Logo(){
    return (
        <svg width="75" height="50" xmlns="http://www.w3.org/2000/svg">
            <text x="15" y="40"  fontSize="45" fill="white" className={`${playfair_display.className} antialiased`}>VI</text>
            <rect x="0" y="20" width="290" height="11" fill="black" />
            <text x="2" y="28" fontSize="7" fill="white" className={`${montserrat.className} antialiased`}>VISIÓN INVERSORA</text>
        </svg>
    )
}