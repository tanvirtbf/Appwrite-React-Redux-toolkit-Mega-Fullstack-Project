import { Account, ID } from "appwrite";
import conf from '../conf/conf.js';

export class AuthService {
  client = new client();
  account; 

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
  }

  async createAccount({email, password, name}) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      if(userAccount) {
        //call another method
        return this.login({email, password});
      }
      else{
        return userAccount;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async login({email, password}) {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error)
    }

    return null;
  }

}

const authService = new AuthService();


export default authService

