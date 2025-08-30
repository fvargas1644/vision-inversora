'use client'

import CashFlowChart from '@/components/analisis/ticker/sidebar/discounted-free-cash-flow/CashFlowChart';
import { mockFinancialModel } from '@/lib/mockData';

export default function TestCashFlowChart() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Test - Diagrama de Flujo de Efectivo Libre</h1>
      <p>Este es un ejemplo del nuevo diagrama de flujo de efectivo libre para el análisis de inversiones.</p>
      
      <CashFlowChart 
        financialData={mockFinancialModel.financialData} 
        predictionsData={mockFinancialModel.predictionsData} 
      />
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Información del Modelo Financiero</h3>
        <ul>
          <li><strong>Precio Actual:</strong> ${mockFinancialModel.stockPrice}</li>
          <li><strong>Valor Intrínseco:</strong> ${mockFinancialModel.intrinsicPrice}</li>
          <li><strong>WACC:</strong> {(mockFinancialModel.wacc * 100).toFixed(1)}%</li>
          <li><strong>Tasa de Crecimiento:</strong> {(mockFinancialModel.growth * 100).toFixed(1)}%</li>
        </ul>
      </div>
    </div>
  );
}