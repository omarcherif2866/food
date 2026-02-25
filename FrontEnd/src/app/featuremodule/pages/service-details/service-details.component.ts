import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Plat } from 'src/app/Models/plats/plat';
import { PlatService } from 'src/app/service/plats/plats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
    plat!: Plat;
  routes = routes;

  constructor(
    private route: ActivatedRoute,
    private platService: PlatService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.platService.getbyid(id).subscribe({
        next: (data) => this.plat = data,
        error: (err) => console.error('Erreur:', err)
      });
    }
  }
}
  // public routes=routes;
  // public albumsOne: any = [];
  // public albumsTwo:any =[];
 
  // constructor(private _lightbox: Lightbox,public router:Router) {
  //   for (let i = 5; i <= 12; i++) {
  //     const src = 'assets/img/gallery/gallery1/gallery-' + i + '.jpg';
  //     const caption = 'Image ' + i + ' caption here';

  //     this.albumsOne.push({ src: src });
  //     this.albumsTwo.push({src:src});
      
      
  //   }
    
  // }
  // open(index: number, albumArray: Array<any>): void {
  //   this._lightbox.open(albumArray, index);
  // }
  // openAll( albumArray: Array<any>): void {
  //   this._lightbox.open(albumArray );
  // }
  

  // close(): void {
  //   this._lightbox.close();
  // }
  // ngOnInit(): void {}
  // direction(){
  //   this.router.navigate([routes.servicedetails])
  // }

