import test = require('blue-tape');

import ipAddress = require('ip-address');

var addr = new ipAddress.Address4("10.10.10.0/24");

test('Basic address validation', (t) => {
  t.plan(4);
  t.equal(addr.subnetMask, 24);
  t.equal(addr.valid, true);
  t.equal(addr.groups, 4);
  t.equal(addr.v4, true);
});
