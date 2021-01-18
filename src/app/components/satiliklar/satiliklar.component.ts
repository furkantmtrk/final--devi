import { Satilik } from './../../models/satilik';
import { FbServisService } from '../../services/fbServis.service';
import { Sonuc } from '../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';




@Component({
  selector: 'app-satiliklar',
  templateUrl: './satiliklar.component.html',
  styleUrls: ['./satiliklar.component.css']
})
export class SatiliklarComponent implements OnInit {
  satiliklar: any;
  secSatilik: Satilik = new Satilik();
  sonuc: Sonuc = new Sonuc();




  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.SatilikListele();
    this.secSatilik.keySat = null;

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
  SatilikDuzenle(satilik: Satilik) {
    Object.assign(this.secSatilik, satilik);
  }
  SatilikSil(satilik: Satilik) {
    this.fbServis.SatilikSil(satilik.keySat).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Satilik Silindi";
    });
  }
  Kaydet() {
    var tarih = new Date();
    this.secSatilik.duzTarihSat = tarih.getTime().toString();

    if (this.secSatilik.keySat == null) {
      this.secSatilik.kayTarihSat = tarih.getTime().toString();
      this.fbServis.SatilikEkle(this.secSatilik).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Satilik Eklendi";
      });
    }
    else {
      this.fbServis.SatilikDuzenle(this.secSatilik).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Satilik Düzenlendi";
      });
    }
  }

  TamamlaIptal(s: Satilik, islem: boolean) {
    var tarih = new Date();
    s.duzTarihSat = tarih.getTime().toString();
    s.islemSat = islem;
    this.fbServis.SatilikDuzenle(s).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Satilik Güncellendi";
    });

  }

  Vazgec() {
    this.secSatilik = new Satilik();
    this.secSatilik.keySat = null;
  }
  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

}
