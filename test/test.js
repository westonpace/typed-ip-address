"use strict";
var test = require('blue-tape');
var ipAddress = require('ip-address');
var addr = new ipAddress.Address4("10.10.10.0/24");
test('Basic address validation', function (t) {
    t.plan(1);
    t.equal(addr.subnetMask, 24);
    t.equal(addr.valid, true);
    t.equal(addr.groups, true);
    t.equal(addr.v4, true);
});
