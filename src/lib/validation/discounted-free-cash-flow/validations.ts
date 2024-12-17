export function validateWacc(wacc: number){

    if (Number.isNaN(wacc)) {
        return {
            error: true,
            errorDes: "Debe ingresar un número valido"
        };
    }

    if (typeof wacc !== "number") {
        return {
            error: true,
            errorDes: "Debe ingresar un número"
        };
    }

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