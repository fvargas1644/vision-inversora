export async function fetchWacc(stock: string = "AAPL") {
    try {
        const response = await fetch(
            `https://www.gurufocus.com/term/wacc/${stock}`
        );

        if (!response.ok) {
            console.error(`HTTP error status: ${response.status}`);
            return {
                data: null,
                error: `HTTP error status: ${response.status}`,
            };
        }

        const body = await response.text();

        // Crear un elemento temporal para analizar el HTML
        const titleMatch = body.match(/<h1[^>]*>(.*?)<\/h1>/s);
        if (titleMatch) {
            const TitleContenido = titleMatch[1].trim(); // .trim() para eliminar espacios en blanco
            const waccMatch = TitleContenido.match(/:(\S+)%/);
            if (waccMatch) {
                const wacc = parseFloat(waccMatch[1])/100;
                return {
                    wacc,
                    error: null,
                };
            } else {
                console.error("Error WACC: WACC no found");
                return {
                    wacc: null,
                    error: "Error WACC: WACC no found",
                };
            }
        } else {
            console.error("Error Title WACC: WACC no found");
            return {
                wacc: null,
                error: "Error Title WACC: WACC no found",
            };
        }
    } catch (error) {
        console.error(`Error: ${String(error)}`);
        return {
            wacc: null,
            error: `Error: ${String(error)}`,
        };
    }
}