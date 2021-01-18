import { Hurda } from './../../models/hurda';
import { FbServisService } from '../../services/fbServis.service';
import { Sonuc } from '../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';




@Component({
  selector: 'app-hurdalar',
  templateUrl: './hurdalar.component.html',
  styleUrls: ['./hurdalar.component.css']
})
export class HurdalarComponent implements OnInit {
  hurdalar: any;
  secHurda: Hurda = new Hurda();
  sonuc: Sonuc = new Sonuc();




  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.HurdaListele();
    this.secHurda.keyHur = null;

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
  HurdaDuzenle(hurda: Hurda) {
    Object.assign(this.secHurda,hurda);
  }
  HurdaSil(hurda: Hurda) {
    this.fbServis.HurdaSil(hurda.keyHur).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Hurda Silindi";
    });
  }
  Kaydet() {
    var tarih = new Date();
    this.secHurda.duzTarihHur = tarih.getTime().toString();

    if (this.secHurda.keyHur == null) {
      this.secHurda.kayTarihHur = tarih.getTime().toString();
      this.fbServis.HurdaEkle(this.secHurda).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Hurda Eklendi";
      });
    }
    else {
      this.fbServis.HurdaDuzenle(this.secHurda).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Hurda Düzenlendi";
      });
    }
  }

  TamamlaIptal(h: Hurda, islem: boolean) {
    var tarih = new Date();
    h.duzTarihHur = tarih.getTime().toString();
    h.islemHur = islem;
    this.fbServis.HurdaDuzenle(h).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Hurda Güncellendi";
    });

  }

  Vazgec() {
    this.secHurda = new Hurda();
    this.secHurda.keyHur = null;
  }
  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

}
