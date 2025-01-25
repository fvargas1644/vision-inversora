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
            {children}
            <SelectionBar stock={params.stock} />
        </>
    )
}