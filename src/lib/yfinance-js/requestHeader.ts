import { RequestError, ValidateError } from "../error";

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
            return cookie
        } else {
            throw new ValidateError('No Cookie found ')
        }
    } catch (err) {
        throw new RequestError(String(err))
    }
}

export async function getCrumb(cookie: string) {
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

        if (!response.ok) throw new RequestError('Request no ok')

        const crumb: string = await response.text();

        if(crumb) {
            return crumb
        } else {
            throw new ValidateError('No Crumb found')
        }

    } catch (err) {
        throw new RequestError(String(err))
    }
}