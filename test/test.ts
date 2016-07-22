import test = require('blue-tape');

import ipAddress = require('ip-address');

test('IPv4 valid address', (t) => {
  var addr = new ipAddress.Address4('10.10.10.0/24');
  t.plan(26);
  t.equal(addr.address, '10.10.10.0/24');
  t.equal(addr.subnet, '/24');
  t.equal(addr.parsedSubnet, '24');
  t.equal(addr.addressMinusSuffix, '10.10.10.0');
  t.deepEqual(addr.parsedAddress, ['10', '10', '10', '0']);
  t.equal(addr.subnetMask, 24);
  t.equal(addr.valid, true);
  t.equal(addr.groups, 4);
  t.equal(addr.v4, true);

  var bigInt = addr.bigInteger();
  t.equal(bigInt.toString(), '168430080');
  t.equal(addr.binaryZeroPad(), '00001010000010100000101000000000');
  t.equal(addr.correctForm(), '10.10.10.0');
  t.equal(addr.startAddress().address, '10.10.10.0');
  t.equal(addr.endAddress().address, '10.10.10.255');
  t.equal(addr.getBitsBase2(3, 5), '01');
  t.equal(addr.isCorrect(), true);
  t.equal(addr.isValid(), true);
  t.equal(new ipAddress.Address4('10.10.10.4').isInSubnet(addr), true);
  t.equal(addr.mask(), '000010100000101000001010')
  t.equal(addr.mask(3), '000')
  t.deepEqual(addr.toArray(), [10, 10, 10, 0]);
  t.equal(addr.toGroup6(), 'a0a:a00');
  t.equal(addr.toHex(), '0a:0a:0a:00');
  t.equal(ipAddress.Address4.fromBigInteger(bigInt).valid, true);
  t.equal(ipAddress.Address4.fromInteger(168430080).valid, true);
  t.equal(ipAddress.Address4.fromHex('0a:0a:0a:00').valid, true);
});

test('IPv4 invalid address', (t) => {
  t.plan(2);
  var addr = new ipAddress.Address4('10.10.10/24');
  t.ok(addr.error);
  t.ok(addr.error.length > 0);
});

test('IPv6 valid address', (t) => {
  t.plan(49);
  var addr = new ipAddress.Address6('fe80::%10');
  var subnet = new ipAddress.Address6('fe80::/120');
  var bigInt = addr.bigInteger();
  t.equal(addr.address, 'fe80::%10');
  t.equal(addr.elidedGroups, 7);
  t.equal(addr.elisionBegin, 1);
  t.equal(addr.elisionEnd, 8);
  t.equal(addr.zone, '%10');
  t.equal(addr.startAddress().address, 'fe80:0000:0000:0000:0000:0000:0000:0000');
  t.equal(addr.endAddress().address, 'fe80:0000:0000:0000:0000:0000:0000:0000');
  t.equal(addr.canonicalForm(), 'fe80:0000:0000:0000:0000:0000:0000:0000');
  t.equal(addr.decimal(), '65152:00000:00000:00000:00000:00000:00000:00000');
  t.equal(addr.getBits().toString(), '338288524927261089654018896841347694592');
  t.equal(addr.getBits(3, 5).toString(), '3');
  t.equal(addr.getScope(), 'Reserved');
  t.equal(addr.getType(), 'Link-local unicast');
  var sixToFour = addr.inspect6to4();
  t.equal(sixToFour.prefix, 'fe80');
  t.equal(sixToFour.gateway, '0.0.0.0');
  t.equal(new ipAddress.Address6('fe80::/120').getBitsPastSubnet(), '00000000');
  t.equal(addr.isInSubnet(new ipAddress.Address6('fe90::/128')), false);
  t.equal(ipAddress.Address6.fromAddress4('10.10.10.0').valid, true);
  t.equal(ipAddress.Address6.fromAddress4(new ipAddress.Address4('10.10.10.0')).valid, false);
  t.equal(ipAddress.Address6.fromBigInteger(bigInt).valid, true);
  t.equal(ipAddress.Address6.fromByteArray(addr.toByteArray()).valid, true);
  t.equal(ipAddress.Address6.fromUnsignedByteArray(addr.toUnsignedByteArray()).valid, true);
  t.equal(ipAddress.Address6.fromURL('http://[ffff::]:8080/foo/').port, 8080);
  var teredo = addr.inspectTeredo();
  t.equal(teredo.prefix, 'fe80:0000');
  t.equal(teredo.server4, '0.0.0.0');
  t.equal(teredo.client4, '255.255.255.255');
  t.equal(teredo.flags, '0000000000000000');
  t.equal(teredo.coneNat, false);
  t.equal(teredo.udpPort, '65535');
  t.equal(teredo.microsoft.reserved, false);
  t.equal(teredo.microsoft.universalLocal, false);
  t.equal(teredo.microsoft.groupIndividual, false);
  t.equal(teredo.microsoft.nonce, '0');
  t.equal(addr.is4(), false);
  t.equal(addr.is6to4(), false);
  t.equal(addr.isCanonical(), false);
  t.equal(addr.isLinkLocal(), true);
  t.equal(addr.isLoopback(), false);
  t.equal(addr.isMulticast(), false);
  t.equal(addr.isTeredo(), false);
  t.equal(addr.microsoftTranscription(), 'fe80--.ipv6-literal.net');
  t.equal(subnet.possibleSubnets(), '256');
  t.equal(subnet.possibleSubnets(124), '16');
  t.equal(subnet.regularExpression().source.length > 50, true);
  t.equal(subnet.regularExpression('f').source.length > 50, true);
  t.equal(subnet.regularExpressionString().length > 50, true);
  t.equal(subnet.regularExpressionString('f').length > 50, true);
  t.equal(subnet.reverseForm(), '0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa.');
  t.equal(subnet.reverseForm({omitSuffix:true}), '0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f')
});
