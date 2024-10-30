import { RequestError, ValidateError } from "./Error";

export async function fetchWacc(stock: string = "AAPL") {
    try {
        const response = await fetch(
            `https://www.gurufocus.com/term/wacc/${stock}`
        );

        if (!response.ok) {
            throw new RequestError('Request no ok')
        }

        const body = await response.text();

        // Crear un elemento temporal para analizar el HTML
        const titleMatch = body.match(/<h1[^>]*>(.*?)<\/h1>/s);
        if (titleMatch) {
            const TitleContenido = titleMatch[1].trim(); // .trim() para eliminar espacios en blanco
            const waccMatch = TitleContenido.match(/:(\S+)%/);
            if (waccMatch) {
                const wacc = parseFloat(waccMatch[1])/100;
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