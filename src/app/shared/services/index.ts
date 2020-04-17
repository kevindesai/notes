import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from './EncrDecrService.service';


@Injectable()
export class CommonService {
	encryptedKey = "gC9@DpinNy1!T9*E";
	
	constructor(private EncrDecr: EncrDecrService) {
		
	}
	
	/**
	 * Clears local storage
	 */
	clearLocalStorage() {
		localStorage.removeItem('isLoggedin');
		localStorage.clear();
	}
	
	/**
	 * Sets local storage
	 * @param key 
	 * @param storeObj 
	 */
	setLocalStorage(key, storeObj) {
		let encrypted = this.EncrDecr.set(this.encryptedKey, storeObj);
		localStorage.setItem(key, encrypted)
	}
	/**
	 * Gets local storage
	 * @param key 
	 * @returns  
	 */
	getLocalStorage(key) {
        let itemValue = localStorage.getItem(key);
        if (itemValue != "" && itemValue != null) {
            let decrypted = this.EncrDecr.get(this.encryptedKey, itemValue);
            return decrypted;
		} else {
			return '';
		}

	}
}
