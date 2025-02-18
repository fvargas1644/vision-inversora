
export function formatPrice(price: number): string {
    const sign = price < 0 ? '-' : ''; // Determina el signo del número
    const absolutePrice = Math.abs(price); // Obtiene el valor absoluto del número
    console.log("hola")
  
    // Moneda en dolares $
    if (absolutePrice >= 1_000_000_000_000_000_000) { // Quintillón (Qi)
        return sign + (absolutePrice / 1_000_000_000_000_000_000).toFixed(3) + 'Qi';
    } else if (absolutePrice >= 1_000_000_000_000_000) { // Cuatrillón (Qa)
        return sign + (absolutePrice / 1_000_000_000_000_000).toFixed(3) + 'Qa';
    } else if (absolutePrice >= 1_000_000_000_000) { // Trillón (T)
        return sign + (absolutePrice / 1_000_000_000_000).toFixed(3) + 'T';
    } else if (absolutePrice >= 1_000_000_000) { // Billón (B)
        return sign + (absolutePrice / 1_000_000_000).toFixed(3) + 'B';
    } else if (absolutePrice >= 1_000_000) { // Millón (M)
        return sign + (absolutePrice / 1_000_000).toFixed(3) + 'M';
    } else if (absolutePrice >= 1_000){
      return sign  + absolutePrice.toLocaleString("us-US", {maximumFractionDigits: 0})
    } else {
      return sign + absolutePrice.toLocaleString("us-US", {maximumFractionDigits: 2})
    }
}

