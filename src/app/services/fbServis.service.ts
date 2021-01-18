import { Kayit } from './../models/kayit';
import { Satilik } from './../models/satilik';
import { Hurda } from './../models/hurda';



import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  private dbKayit = '/Kayitlar';
  private dbSatilik = '/Satiliklar';
  private dbHurda = '/Hurdalar';
  kayitRef: AngularFireList<Kayit> = null;
  satilikRef: AngularFireList<Satilik> = null;
  hurdaRef: AngularFireList<Hurda> = null;


  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.satilikRef = db.list(this.dbSatilik);
    this.hurdaRef = db.list(this.dbHurda);

  }

  /* kayıtlar firebase servis başlangıç  */

  KayitListele() {
    return this.kayitRef;
  }
  KayitEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }

  KayitDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }
  /* kayıtlar firebase servis bitiş  */

/* satiliklar firebase servis başlangıç  */

SatilikListele() {
  return this.satilikRef;
}
SatilikEkle(satilik: Satilik) {
  return this.satilikRef.push(satilik);
}

SatilikDuzenle(satilik:Satilik) {
  return this.satilikRef.update(satilik.keySat, satilik);
}
SatilikSil(keySat: string) {
  return this.satilikRef.remove(keySat);
}
/* satiliklarr firebase servis bitiş  */

/* hurdalar firebase servis başlangıç  */

HurdaListele() {
  return this.hurdaRef;
}
HurdaEkle(hurda: Hurda) {
  return this.hurdaRef.push(hurda);
}

HurdaDuzenle(hurda: Hurda) {
  return this.hurdaRef.update(hurda.keyHur, hurda);
}
HurdaSil(keyHur: string) {
  return this.hurdaRef.remove(keyHur);
}
/* hurdalar firebase servis bitiş  */





  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }

}
