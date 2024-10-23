'use server'

import { error } from "console";

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
        error: null
      }
    }

    console.error("Error en decodificar cookie");
    return { 
      cookie: null,
      error: 'Decoding error cookie'
    };
  } catch (error) {
    console.error(`Error fetching cookie: ${String(error)}`);
    return { 
      cookie: null,
      error: 'Falló en fetching de cookie'
    };
  }
}

export async function getCrumb(cookie : string) {
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
        console.error(`HTTP error status: ${response.status}`)
        return {
          data: null,
          error: `HTTP error status: ${response.status}`
        }
      }

      const data: string = await response.text();

      return {
        data,
        error: null
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      return {
        data: null,
        error: `Error: ${error}`
      }
    }
  } else {
    console.error('Cookie error: cookie is null');
    return {
      data: null,
      error: `Cookie error: cookie is null`
    }
  }
}

export async function getParams(cookie : string, stock: string = 'AAPL', crumb: string){
  const paramsArr = ['annualTotalRevenue', 'annualNetIncome', 'annualFreeCashFlow']
  const paramsString = paramsArr.map(String).join(',');
  const url = `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${stock}?symbol=${stock}&type=${paramsString}&period1=1483142400&period2=1729555200&crumb=${crumb}`;
  
  if (cookie && crumb) {
    try {
      const response = await fetch(
        url,
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
          data: null,
          error: `HTTP error status: ${response.status}`
        }
      }

      const result: string = await response.text();
      const data = JSON.parse(result)
      return {
        data,
        error: null
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      return {
        data: null,
        error: `Error: ${error}`
      }
    }
  } else {
    console.error('Error: cookie or crumb is null');
    const result = cookie ? 
      { data: null, error: 'Cookie error: cookie is null'} : 
      { data: null, error: 'Crumb error: crumb is null'}
    return result
  }
}

export async function getWacc(stock : string = 'AAPL') {
  try {
    const response = await fetch(`https://www.gurufocus.com/term/wacc/${stock}`);

    if (!response.ok) {
      console.error(`HTTP error status: ${response.status}`);
      return {
        data: null,
        error: `HTTP error status: ${response.status}`
      }
    }

    const body = await response.text()

    // Crear un elemento temporal para analizar el HTML
    const titleMatch = body.match(/<h1[^>]*>(.*?)<\/h1>/s);
    if (titleMatch) {
      const TitleContenido = titleMatch[1].trim(); // .trim() para eliminar espacios en blanco
      const waccMatch = TitleContenido.match(/:(\S+)%/);
      if(waccMatch){
        const wacc = parseFloat(waccMatch[1]);
        return {
          wacc,
          error: null
        }
      } else {
        console.error('Error WACC: WACC no found');
        return {
          wacc: null,
          error: 'Error WACC: WACC no found'
        }
      }   
    } else {
      console.error('Error Title WACC: WACC no found');
      return {
        wacc: null,
        error: 'Error Title WACC: WACC no found'
      }
    }

    //return response.text()
    
  } catch (error) {
    console.error(`Error: ${String(error)}`)
    return {
      wacc: null,
      error: `Error: ${String(error)}`
    }
  }
}


