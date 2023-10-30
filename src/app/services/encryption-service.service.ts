import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  encrypt(data: any, key: string): string {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encryptedData;
  }

  decrypt(encryptedData: string, key: string): any {
    const decryptedData = JSON.parse(
      CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8)
    );
    return decryptedData;
  }
}
