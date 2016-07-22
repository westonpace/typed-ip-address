declare namespace ipAddress {

  class SixToFour {
    prefix:string;
    gateway:string;
  }

  class TeredoMicrosoft {
    reserved:boolean;
    universalLocal:boolean;
    groupIndividual:boolean;
    nonce:string;
  }

  class Teredo {
    prefix:string;
    server4:string;
    client4:string;
    flags:string;
    coneNat:boolean;
    udpPort:string;
    microsoft: TeredoMicrosoft;
  }

  class ReverseOptions {
    omitSuffix:boolean;
  }

  class Address {

    address:string;
    subnet:string;
    parsedSubnet:string;
    addressMinusSuffix:string;
    parsedAddress:Array<string>;
    subnetMask:number;
    groups:number;
    valid:boolean;
    v4:boolean;
    error:string;

    bigInteger():jsbn.BigInteger;
    binaryZeroPad():string;
    correctForm():string;
    endAddress():Address;
    startAddress():Address;
    isCorrect():boolean;
    isValid():boolean;
    getBitsBase2(start:number, end:number):string;
    mask(numBits?:number):string;
    toGroup6():string;
    toHex():string;

  }

  class Address4 extends Address {

    constructor(address:string);

    static fromBigInteger(address:jsbn.BigInteger):Address4;
    static fromInteger(address:number):Address4;
    static fromHex(address:string):Address4;

    endAddress():Address4;
    startAddress():Address4;
    isInSubnet(subnet:Address4):boolean;
    toArray():Array<number>;

  }

  class Address6 extends Address {

    elidedGroups:number;
    elisionBegin:number;
    elisionEnd:number;
    port:number;
    zone:string;

    constructor(address:string);

    static fromBigInteger(address:jsbn.BigInteger):Address6;
    static fromAddress4(address:string):Address6;
    static fromAddress4(address:Address4):Address6;
    static fromByteArray(address:Array<number>):Address6;
    static fromUnsignedByteArray(address:Array<number>):Address6;
    static fromURL(addressUrl:string):Address6;

    endAddress():Address6;
    startAddress():Address6;
    isInSubnet(subnet:Address6):boolean;
    toByteArray():Array<number>;
    toUnsignedByteArray():Array<number>;
    canonicalForm():string;
    decimal():string;
    getBits(start?:number, end?:number):jsbn.BigInteger;
    getBitsPastSubnet():string;
    getScope():string;
    getType():string;
    inspect6to4():SixToFour;
    inspectTeredo():Teredo;
    is4():boolean;
    is6to4():boolean;
    isCanonical():boolean;
    isLinkLocal():boolean;
    isLoopback():boolean;
    isMulticast():boolean;
    isTeredo():boolean;
    microsoftTranscription():string;
    possibleSubnets(subnetSize?:number):RegExp;
    regularExpression(substring?:string):RegExp;
    regularExpressionString(substring?:string):string;
    reverseForm(options?:ReverseOptions):string;
    to4():Address4;
    to4in6():string;
    to6to4():Address6;
    toByteArray():Array<number>;
    toUnsignedByteArray():Array<number>;
  }

}

export = ipAddress;
