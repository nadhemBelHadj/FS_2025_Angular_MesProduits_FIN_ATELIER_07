import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule,CommonModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {

  nomProduit! :string;
  produits! : Produit[];
  searchTerm! : string;

  constructor(private produitService:ProduitService ){}

  ngOnInit(): void {
     this.produitService.listeProduit().subscribe(prods => {
    console.log(prods);
    this.produits = prods;
    }); 

    //this.produits = [];
    }


  rechercherProds()
  {
    if (this.nomProduit)
      // if (this.nomProduit !== "")
      this.produitService
        .rechercherParNom(this.nomProduit)
        .subscribe((prods) => {
          console.log(prods);
          this.produits = prods;
        });
    else
      this.produitService.listeProduit().subscribe((prods) => {
        console.log(prods);
        this.produits = prods;
      });


  }
}
