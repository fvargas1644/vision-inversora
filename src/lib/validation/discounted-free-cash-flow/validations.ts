function generalValidate(value : number) {
    if (Number.isNaN(value)) return "Debe ingresar un número valido"

    if (typeof value !== "number") return "Debe ingresar un número"
    
    return null
}

export function validateWacc(wacc: number){

    const general = generalValidate(wacc)
    
    if (general) return general

    if (wacc <= 0) return "El WACC debe ser mayor a 0"

    if (wacc > 100) return "El WACC debe ser menor a 100"

    return null
}

export function validateGrowth(growth: number){

    const general = generalValidate(growth)
    
    if (general) return general

    if (growth <= 0) return  "El crecimiento debe ser mayor a 0";

    if (growth > 100) return "El crecimiento debe ser menor a 100";

    return null
}