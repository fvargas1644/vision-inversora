import SelectionBar from "@/components/analisis/SelectionBar";

export default function Layout({
    children,
    params
}: Readonly<{
  children: React.ReactNode;
  params: {stock: string}
}>){
    return (
        <>
            <SelectionBar stock={params.stock} />
            {children}
        </>
    )
}