import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { DollarSign, TrendingUp, Calculator } from 'lucide-react';

export const MoneyTool = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [rate, setRate] = useState<string>('5');
  const [years, setYears] = useState<string>('10');
  const [result, setResult] = useState<number | null>(null);

  const calculateCompoundInterest = () => {
    const principal = parseFloat(amount) || 0;
    const interestRate = parseFloat(rate) || 0;
    const time = parseFloat(years) || 0;

    const finalAmount = principal * Math.pow(1 + interestRate / 100, time);
    setResult(finalAmount);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const earnings = result ? result - parseFloat(amount) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Money Tool</h1>
        <p className="text-gray-600">Calculate compound interest and investment growth</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Input Values">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Amount ($)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter initial amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                step="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter interest rate"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter number of years"
              />
            </div>

            <Button onClick={calculateCompoundInterest} fullWidth size="lg">
              <Calculator className="w-5 h-5 mr-2" />
              Calculate
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Results">
            {result === null ? (
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Enter values and click Calculate to see results</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Final Amount</p>
                  <p className="text-3xl font-bold text-green-700">{formatCurrency(result)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Initial Amount</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(parseFloat(amount))}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Earnings</p>
                    <p className="text-xl font-semibold text-green-600">
                      {formatCurrency(earnings)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-medium text-gray-900">{rate}% per year</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time Period:</span>
                    <span className="font-medium text-gray-900">{years} years</span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card title="Formula">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Compound Interest Formula:</p>
              <code className="text-xs text-gray-900 bg-white px-3 py-2 rounded border border-gray-200 block">
                A = P(1 + r)^t
              </code>
              <ul className="mt-3 text-xs text-gray-600 space-y-1">
                <li>A = Final amount</li>
                <li>P = Principal (initial amount)</li>
                <li>r = Annual interest rate (decimal)</li>
                <li>t = Time in years</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
