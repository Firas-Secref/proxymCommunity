export class Developer {
  id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  birthdate!: any;
  email!: string;
  password!: string;
  ville!: string;
  address!: string;
  pays!: string;
  profileImage!: string;
  departement!: string;
  profile!: string;
  codePostal!: number;
  // aPropos!: string;

  constructor(firstName: string, lastName: string, username: string, password: string, birthdate: any, email: string, ville: string, address: string, pays: string, department: string, profile: string, codePostal: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.birthdate = birthdate;
    this.email = email;
    this.ville = ville;
    this.address = address;
    this.pays = pays;
    this.departement = department;
    this.profile = profile;
    this.codePostal = codePostal;
    // this.aPropos = aPropos;
  }


}
