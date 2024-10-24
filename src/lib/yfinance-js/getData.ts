"use server";

const userAgent: string =
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
interface FetchYFinanceParams {
    cookie: string,
    stock?: string,
    crumb: string,
    params: string
}
export async function fetchYFinance({ cookie, stock = "AAPL", crumb, params }: FetchYFinanceParams) {

    const url = `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${stock}?symbol=${stock}&type=${params}&period1=1483142400&period2=1729555200&crumb=${crumb}`;

    if (cookie && crumb) {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "User-Agent": userAgent,
                    "Accept-Encoding": "gzip, deflate",
                    Accept: "*/*",
                    Connection: "keep-alive",
                    Cookie: cookie,
                },
            });

            if (!response.ok) {
                console.error(`HTTP error status: ${response.status}`);
                return {
                    data: null,
                    error: `HTTP error status: ${response.status}`,
                };
            }

            const result: string = await response.text();
            const data = JSON.parse(result);
            return {
                data,
                error: null,
            };
        } catch (error) {
            console.error(`Error: ${error}`);
            return {
                data: null,
                error: `Error: ${error}`,
            };
        }
    } else {
        console.error("Error: cookie or crumb is null");
        const result = cookie
            ? { data: null, error: "Cookie error: cookie is null" }
            : { data: null, error: "Crumb error: crumb is null" };
        return result;
    }
}

export async function getWacc(stock: string = "AAPL") {
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
                const wacc = parseFloat(waccMatch[1]);
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

export async function yFinanceQuery(query: string = "") {
    let paramsArr: string[] = [];

    const cookie = await getCookie();

    if (!cookie.cookie) {
        return {
            data: null,
            error: cookie.error,
        };
    }

    const crumb = await getCrumb(cookie.cookie);

    if (!crumb.crumb) {
        return {
            data: null,
            error: crumb.crumb,
        };
    }

    switch (query) {
        case "DISCOUNTED_FREE_CASH_FLOW":
            paramsArr = [
                "annualTotalRevenue",
                "annualNetIncome",
                "annualFreeCashFlow",
            ];
    }

    if (paramsArr.length !== 0) {
        const paramsString = paramsArr.map(String).join(",");

        const fetch = await fetchYFinance({
            cookie: cookie.cookie,
            stock: "AAPL",
            crumb: crumb.crumb,
            params: paramsString
        }
        );
        if (fetch.data !== null) {
            return {
                data: fetch.data,
                error: null,
            };
        } else {
            return {
                data: null,
                error: fetch.error,
            };
        }
    } else {
        console.error("No se ha proporcionado una query valida");
        return {
            data: null,
            error: "No se ha proporcionado una query valida",
        };
    }
}
