import { Satilik } from './../../models/satilik';
import { Hurda } from './../../models/hurda';
import { Kayit } from './../../models/kayit';
import { FbServisService } from '../../services/fbServis.service';
import { Sonuc } from '../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  kayitlar: any;
  kayit: any;

  satiliklar:any;
  satilik:any;

  hurdalar:any;
  hurda:any;



  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  detay: boolean = false;
  detayy: boolean = false;
  silme: boolean = false;
  ekleduzenle: boolean = false;

  secSatilik: Satilik = new Satilik();
  sonucSat: Sonuc = new Sonuc();
  detaySat: boolean = false;
  detayySat: boolean = false;
  silmeSat: boolean = false;
  ekleduzenleSat: boolean = false;

  secHurda: Hurda = new Hurda();
  sonucHur: Sonuc = new Sonuc();
  detayHur: boolean = false;
  detayyHur: boolean = false;
  silmeHur: boolean = false;
  ekleduzenleHur: boolean = false;



  constructor(

    public fbServis: FbServisService,
    public router: Router
  ) { }



  ngOnInit() {

    this.KayitListele();
    this.secKayit.key = null;
    this.HurdaListele();
    this.secHurda.keyHur = null;
    this.SatilikListele();
    this.secSatilik.keySat = null;
  }






  Sil() {

    this.fbServis.KayitSil(this.secKayit.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
      this.silme = false;
    });

    this.fbServis.SatilikSil(this.secSatilik.keySat).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Satılık Silindi";
      this.silme = false;
    });

    this.fbServis.HurdaSil(this.secHurda.keyHur).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Hurda Silindi";
      this.silme = false;
    });
  }


  TamamlaIptal(k: Kayit, islem: boolean ,) {
    var tarih = new Date();
    k.duzTarih = tarih.getTime().toString();
    k.islem = islem;
    this.fbServis.KayitDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Güncellendi";
    });

  }

  TamamlaIptalSat(s: Satilik, islem: boolean ,) {
    var tarih = new Date();
    s.duzTarihSat = tarih.getTime().toString();
    s.islemSat = islem;
    this.fbServis.SatilikDuzenle(s).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Satilik Güncellendi";
    });

  }
  TamamlaIptalHur(h: Hurda, islem: boolean ,) {
    var tarih = new Date();
    h.duzTarihHur = tarih.getTime().toString();
    h.islemHur = islem;
    this.fbServis.HurdaDuzenle(h).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Hurda Güncellendi";
    });
  }




  KayitSec(k: Kayit) {
    Object.assign(this.secKayit, k);

  }

  SatilikSec(s: Satilik) {
    Object.assign(this.secSatilik, s);

  }

  HurdaSec(h: Hurda) {
    Object.assign(this.secHurda, h);

  }


  KayitListele() {
    this.fbServis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data;
    });

  }

  SatilikListele() {
    this.fbServis.SatilikListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(se =>
          ({ key: se.payload.key, ...se.payload.val() })
        )
      )
    ).subscribe(data => {
      this.satiliklar = data;
    });

  }

  HurdaListele() {
    this.fbServis.HurdaListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(he =>
          ({ key: he.payload.key, ...he.payload.val() })
        )
      )
    ).subscribe(data => {
      this.hurdalar = data;
    });

  }


  KayitDuzenle(kayit: Kayit) {
    Object.assign(this.secKayit, kayit);
  }


  SatilikDuzenle(satilik: Satilik) {
    Object.assign(this.secKayit, satilik);
  }

  HurdaDuzenle(hurda: Hurda) {
    Object.assign(this.secKayit, hurda);
  }


  KayitSil(kayit: Kayit) {
    this.fbServis.KayitSil(kayit.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kiralık Kayıt Silindi";
    });
  }

  SatilikSil(satilik: Satilik) {
    this.fbServis.SatilikSil(satilik.keySat).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Satılık Kayıt Silindi";
    });
  }

  HurdaSil(hurda: Hurda) {
    this.fbServis.HurdaSil(hurda.keyHur).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Hurda Kayıt Silindi";
    });
  }


  Kaydet() {
    var tarih = new Date();
    this.secKayit.duzTarih = tarih.getTime().toString();

    if (this.secKayit.key == null) {
      this.secKayit.kayTarih = tarih.getTime().toString();
      this.secKayit.duzTarih = tarih.getTime().toString();
      this.secKayit.islem = false;
      this.fbServis.KayitEkle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    }
    else {
      this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Düzenlendi";
      });
    }

    var tarih = new Date();
    this.secSatilik.duzTarihSat = tarih.getTime().toString();

    if (this.secSatilik.keySat == null) {
      this.secSatilik.kayTarihSat = tarih.getTime().toString();
      this.secSatilik.duzTarihSat = tarih.getTime().toString();
      this.secSatilik.islemSat = false;
      this.fbServis.SatilikEkle(this.secSatilik).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Satılık Kayıt Eklendi";
      });
    }
    else {
      this.fbServis.SatilikDuzenle(this.secSatilik).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Satilik Kayıt Düzenlendi";
      });
    }

    var tarih = new Date();
    this.secHurda.duzTarihHur = tarih.getTime().toString();

    if (this.secHurda.keyHur == null) {
      this.secHurda.kayTarihHur = tarih.getTime().toString();
      this.secHurda.duzTarihHur = tarih.getTime().toString();
      this.secHurda.islemHur = false;
      this.fbServis.HurdaEkle(this.secHurda).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Hurda Kayıt Eklendi";
      });
    }
    else {
      this.fbServis.HurdaDuzenle(this.secHurda).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Hurda Kayıt Düzenlendi";
      });
    }
  }

  Vazgec() {
    this.secKayit = new Kayit();
    this.secKayit.key = null;

    this.secSatilik = new Satilik();
    this.secSatilik.keySat= null;

    this.secHurda = new Hurda();
    this.secHurda.keyHur = null;
  }
  /* kayıtlar firebase servis başlangıç  */



  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }
}
