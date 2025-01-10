'use server'

import { ValidateError } from "@/lib/Error/Error";

export async function validate(value : number) {
    if (Number.isNaN(value)) throw new ValidateError("Debe ingresar un número valido");

    if (typeof value !== "number") throw new ValidateError("Debe ingresar un número");
    
    if (value <= 0) throw new ValidateError("El valor debe ser mayor a 0");

    if (value > 1) throw new ValidateError("El valor debe ser menor a 1");
    
}
