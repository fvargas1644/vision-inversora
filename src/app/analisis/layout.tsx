import SelectionBar from "@/components/analisis/SelectionBar";

export default function Layout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
        <>
            <SelectionBar />
            {children}
        </>
    )
}