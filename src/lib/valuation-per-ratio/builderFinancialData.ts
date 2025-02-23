export default function  buildFinancialData({yFinanceDataDiscountedFreeCashFlow, companyConcepts} : any) {
    extractCompanyConceptsData(companyConcepts.facts.dei.EntityCommonStockSharesOutstanding.units.shares)
}

function extractCompanyConceptsData(companyConcepts: any) {
    console.log(companyConcepts)
}