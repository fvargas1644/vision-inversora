export const userAgent: string =
    "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36";

export async function getCookie() {
    try {
        const response = await fetch("https://fc.yahoo.com", {
            method: "GET",
            headers: {
                "User-Agent": userAgent,
            },
        });
        const setCookie = response.headers.get("set-cookie");

        if (setCookie) {
            const cookie: string = setCookie.split(";")[0].trim();
            return {
                cookie,
                error: null,
            };
        }

        console.error("Error en decodificar cookie");
        return {
            cookie: null,
            error: "Decoding error cookie",
        };
    } catch (error) {
        console.error(`Error fetching cookie: ${String(error)}`);
        return {
            cookie: null,
            error: "Falló en fetching de cookie",
        };
    }
}

export async function getCrumb(cookie: string) {
    if (cookie) {
        try {
            const response = await fetch(
                "https://query1.finance.yahoo.com/v1/test/getcrumb",
                {
                    method: "GET",
                    headers: {
                        "User-Agent": userAgent,
                        "Accept-Encoding": "gzip, deflate",
                        Accept: "*/*",
                        Connection: "keep-alive",
                        Cookie: cookie,
                    },
                }
            );

            if (!response.ok) {
                console.error(`HTTP error status: ${response.status}`);
                return {
                    crumb: null,
                    error: `HTTP error status: ${response.status}`,
                };
            }

            const crumb: string = await response.text();

            return {
                crumb,
                error: null,
            };
        } catch (error) {
            console.error(`Error: ${error}`);
            return {
                crumb: null,
                error: `Error: ${error}`,
            };
        }
    } else {
        console.error("Cookie error: cookie is null");
        return {
            crumb: null,
            error: `Cookie error: cookie is null`,
        };
    }
}