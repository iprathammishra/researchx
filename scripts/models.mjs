export const defenses = (rows, index) => rows[index] ?? rows[0];
export const trifecta = ({ privateData, untrustedContent, externalCommunication }) => Boolean(privateData && untrustedContent && externalCommunication);
export const permission = (recipient, gate) => !gate ? 'uncontrolled' : ['Alice', 'Bob'].includes(recipient) ? 'allowed' : 'blocked';
export function statements(revenue, collected, expenses) {
  const profit = revenue - expenses;
  const cashFlow = collected - expenses;
  const receivables = revenue - collected;
  const closingCash = 50 + cashFlow;
  const assets = closingCash + receivables;
  return {profit, cashFlow, receivables, closingCash, assets, equity: 50 + profit};
}
