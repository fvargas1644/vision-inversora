import { RequestError, ValidateError } from "@/lib/Error/Error";

export async function fetchWacc(ticker: string = "AAPL") {
    try {
        const response = await fetch(
            `https://valueinvesting.io/${ticker}/valuation/wacc`
        );

        if (!response.ok) {
            throw new RequestError('Request no ok');
        }

        const body = await response.text();

        // Crear un elemento temporal para analizar el HTML
        const titleMatch = body.match(/<td class="align_right orange bold">(\d+(\.\d+)?)%<\/td>/);
        if (titleMatch) {
            const waccMatch = titleMatch[1].trim(); // .trim() para eliminar espacios en blanco
            
            if (waccMatch) {
                const wacc = parseFloat(waccMatch)/100;
                return wacc
            } else {
                throw new ValidateError('No found wacc')
            }
        } else {
            throw new ValidateError('No found wacc')
        }
    } catch (err) {
        throw new RequestError(String(err))
    }
}