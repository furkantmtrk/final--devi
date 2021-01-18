import { Kayit } from './../../models/kayit';
import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';




@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  kayitlar: any;
  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();




  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.secKayit.key = null;

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
  KayitDuzenle(kayit: Kayit) {
    Object.assign(this.secKayit, kayit);
  }
  KayitSil(kayit: Kayit) {
    this.fbServis.KayitSil(kayit.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
    });
  }
  Kaydet() {
    var tarih = new Date();
    this.secKayit.duzTarih = tarih.getTime().toString();

    if (this.secKayit.key == null) {
      this.secKayit.kayTarih = tarih.getTime().toString();
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
  }

  TamamlaIptal(k: Kayit, islem: boolean) {
    var tarih = new Date();
    k.duzTarih = tarih.getTime().toString();
    k.islem = islem;
    this.fbServis.KayitDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Güncellendi";
    });

  }

  Vazgec() {
    this.secKayit = new Kayit();
    this.secKayit.key = null;
  }
  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

}
