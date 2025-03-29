import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BorrowingCapacityApp() {
  const [step, setStep] = useState(1);
  const [singleIncome, setSingleIncome] = useState("");
  const [partnerIncome, setPartnerIncome] = useState("");
  const [isCouple, setIsCouple] = useState(false);
  const [borrowingPower, setBorrowingPower] = useState(null);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [payslip, setPayslip] = useState(null);
  const [expenses, setExpenses] = useState("");
  const [creditScore, setCreditScore] = useState(null);
  const [loanOptions, setLoanOptions] = useState([]);

  const handleCalculate = () => {
    const income1 = parseFloat(singleIncome) || 0;
    const income2 = isCouple ? parseFloat(partnerIncome) || 0 : 0;
    const totalIncome = income1 + income2;
    const borrowing = totalIncome * 5;
    setBorrowingPower(borrowing);
    setStep(3);
  };

  const handleDetailsSubmit = () => {
    setStep(5);
  };

  const handleBankScan = () => {
    const totalIncome = parseFloat(singleIncome || 0) + (isCouple ? parseFloat(partnerIncome || 0) : 0);
    const monthlyExpenses = parseFloat(expenses || 0);
    const annualExpenses = monthlyExpenses * 12;
    const expenseRatio = annualExpenses / totalIncome;

    const mockCreditScore = 720;

    const offers = [
      {
        lender: "Bank A",
        rate: "5.45% p.a.",
        maxBorrow: `$${(borrowingPower * 0.95).toLocaleString()}`,
        minScore: 700,
        maxExpenseRatio: 0.6,
      },
      {
        lender: "Bank B",
        rate: "5.60% p.a.",
        maxBorrow: `$${(borrowingPower * 0.90).toLocaleString()}`,
        minScore: 680,
        maxExpenseRatio: 0.65,
      },
      {
        lender: "Bank C",
        rate: "5.30% p.a.",
        maxBorrow: `$${(borrowingPower * 0.85).toLocaleString()}`,
        minScore: 740,
        maxExpenseRatio: 0.5,
      },
    ];

    const matchedOffers = offers.filter(
      (offer) => mockCreditScore >= offer.minScore && expenseRatio <= offer.maxExpenseRatio
    );

    setCreditScore(mockCreditScore);
    setLoanOptions(matchedOffers);
    setStep(6);
  };

  const resetApp = () => {
    setStep(1);
    setSingleIncome("");
    setPartnerIncome("");
    setIsCouple(false);
    setBorrowingPower(null);
    setPropertyAddress("");
    setPayslip(null);
    setExpenses("");
    setCreditScore(null);
    setLoanOptions([]);
  };

  return <div>Borrowing Capacity App Placeholder</div>;
}