import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { Categoriesgrid } from '../../components/categoriesgrid/categoriesgrid';
import { Offersbar } from '../../components/offersbar/offersbar';
import { Offerstrip } from '../../components/offerstrip/offerstrip';

@Component({
  selector: 'app-landing-page-layout',
  imports: [Carousel, Categoriesgrid, Offersbar, Offerstrip],
  templateUrl: './landing-page-layout.html',
  styleUrl: './landing-page-layout.css',
})
export class LandingPageLayout {}
