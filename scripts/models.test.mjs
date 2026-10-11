import test from 'node:test';
import assert from 'node:assert/strict';
import {trifecta, permission, statements} from './models.mjs';
test('the depicted conjunction needs all three conditions', () => {
  for (let mask = 0; mask < 8; mask++) assert.equal(trifecta({privateData: mask & 1, untrustedContent: mask & 2, externalCommunication: mask & 4}), mask === 7);
});
test('the permission example blocks an unlisted recipient only with enforcement', () => {
  assert.equal(permission('Bob', true), 'allowed');
  assert.equal(permission('Mallory', true), 'blocked');
  assert.equal(permission('Mallory', false), 'uncontrolled');
});
test('profit, cash flow and the balance sheet reconcile over all controls', () => {
  for (let collected = 0; collected <= 100; collected += 5) {
    for (let expenses = 0; expenses <= 80; expenses += 5) {
      const m = statements(100, collected, expenses);
      assert.equal(m.assets, m.equity);
      assert.equal(m.cashFlow + m.receivables, m.profit);
    }
  }
  assert.deepEqual(statements(100, 80, 60), {profit:40,cashFlow:20,receivables:20,closingCash:70,assets:90,equity:90});
});
