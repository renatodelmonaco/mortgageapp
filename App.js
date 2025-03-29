
import React, { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [singleIncome, setSingleIncome] = useState("");
  const [partnerIncome, setPartnerIncome] = useState("");
  const [isCouple, setIsCouple] = useState(false);
  const [borrowingPower, setBorrowingPower] = useState(null);

  const handleCalculate = () => {
    const income1 = parseFloat(singleIncome) || 0;
    const income2 = isCouple ? parseFloat(partnerIncome) || 0 : 0;
    const totalIncome = income1 + income2;
    const borrowing = totalIncome * 5;
    setBorrowingPower(borrowing);
    setStep(3);
  };

  const resetApp = () => {
    setStep(1);
    setSingleIncome("");
    setPartnerIncome("");
    setIsCouple(false);
    setBorrowingPower(null);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      {step === 1 && (
        <div>
          <h2>Who's applying?</h2>
          <button onClick={() => { setIsCouple(false); setStep(2); }}>Just Me</button>
          <button onClick={() => { setIsCouple(true); setStep(2); }}>Me & Partner</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Enter your income details</h2>
          <input
            type="number"
            placeholder="Your annual income (before tax)"
            value={singleIncome}
            onChange={(e) => setSingleIncome(e.target.value)}
          />
          {isCouple && (
            <input
              type="number"
              placeholder="Partner's annual income (before tax)"
              value={partnerIncome}
              onChange={(e) => setPartnerIncome(e.target.value)}
            />
          )}
          <button onClick={handleCalculate}>Calculate</button>
        </div>
      )}

      {step === 3 && borrowingPower !== null && (
        <div style={{ textAlign: "center" }}>
          <h2>Estimated Borrowing Power</h2>
          <p style={{ fontSize: 24, fontWeight: "bold", color: "green" }}>
            ${borrowingPower.toLocaleString()}
          </p>
          <p>
            Based on 5× gross income. Results may vary based on credit score, bank statements, liabilities, and property collateral.
          </p>
          <button onClick={resetApp}>Start Over</button>
        </div>
      )}
    </div>
  );
}

export default App;
