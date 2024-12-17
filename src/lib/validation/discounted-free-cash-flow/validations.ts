function generalValidate(value : number) {
    if (Number.isNaN(value)) {
        return {
            error: true,
            errorDes: "Debe ingresar un número valido"
        };
    }

    if (typeof value !== "number") {
        return {
            error: true,
            errorDes: "Debe ingresar un número"
        };
    }

    return undefined
}

export function validateWacc(wacc: number){

    const general = generalValidate(wacc)
    
    if (general) return general
   

    if (wacc <= 0) {
        return {
            error: true,
            errorDes: "El WACC debe ser mayor a 0"
        };
    }

    if (wacc > 100) {
        return {
            error: true,
            errorDes: "El WACC debe ser menor a 100"
        };
    }

    return {
        error: false,
        errorDes: null
    };
}

export function validateGrowth(growth: number){

    const general = generalValidate(growth)
    
    if (general) return general

    if (growth <= 0) {
        return {
            error: true,
            errorDes: "El crecimiento debe ser mayor a 0"
        };
    }

    if (growth > 100) {
        return {
            error: true,
            errorDes: "El crecimiento debe ser menor a 100"
        };
    }

    return {
        error: false,
        errorDes: null
    };
}