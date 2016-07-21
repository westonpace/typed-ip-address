declare namespace ipAddress {

  class Address4 {

    subnetMask:number;
    groups:number;
    valid:boolean;
    v4:boolean;

    constructor(address:string);
  }

}

export = ipAddress;
