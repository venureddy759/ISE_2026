import { Injectable } from "@nestjs/common";
import admin from "../common/firebase/firebase";

@Injectable()
export class AuthService {

  async verifyGoogleToken(token: string) {
    const decoded = await admin.auth().verifyIdToken(token);
    
    return {
      uid: decoded.uid,
      email: decoded.email,
      provider: decoded.firebase.sign_in_provider,
    };
  }
}