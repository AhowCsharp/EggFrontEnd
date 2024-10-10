// src/contexts/InvoiceContext.js

import React, { createContext, useState } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
    const [invoiceType, setInvoiceType] = useState(1); // Default to Personal Cloud Invoice
    const [number, setNumber] = useState(''); // Carrier data or donation tax ID
  
    return (
      <InvoiceContext.Provider
        value={{
          invoiceType,
          setInvoiceType,
          number,
          setNumber,
        }}
      >
        {children}
      </InvoiceContext.Provider>
    );
};
