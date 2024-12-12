import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit  {
  produits! : Produit[]; //un tableau de Produit
  constructor(private produitService: ProduitService ) {
   // this.produits = produitService.listeProduits();
     
    /* this.produits = [
      {idProduit : 1,  nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011")},
      {idProduit : 2,  nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010")},
      {idProduit : 3,  nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020")}
            ];  */
   }
  
   ngOnInit() {
    this.chargerProduits();
     }

    chargerProduits(){
      this.produitService.listeProduit().subscribe(prods => {
        console.log(prods);
        this.produits = prods;
      }); 
    }
  
  




    supprimerProduit(p: Produit)
    {
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
           });
    } 


    

}
