export type SecEdgarTicker = [
    number,
    string,
    string,
    string,
]

export interface secEdgarCompanyTickers {
    fields: string[];
    data: SecEdgarTicker[];
}

export interface SecEdgarFinancialData {
    cik: number;
    entityName: string;
    facts: {
        [key: string]: {
            [key: string]: SecEdgarFactDetails;
        };
    };
}

interface SecEdgarFactDetails {
    label: string;
    description: string;
    units: {
        [unit: string]: SecEdgarUnitData[];
    };
}

interface SecEdgarUnitData {
    end: string;
    val: number;
    accn: string;
    fy: number;
    fp: string;
    form: string;
    filed: string;
    frame?: string;
}



