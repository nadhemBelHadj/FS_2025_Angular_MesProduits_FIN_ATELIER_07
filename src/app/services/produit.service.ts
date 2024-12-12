import { Injectable } from '@angular/core'; 
import { Produit } from '../model/produit.model';  // 
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/catgorieWrapped.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[]; //un tableau de Produit
  produit!: Produit;
  categories!: Categorie[];

  apiURL: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';
  constructor(private http: HttpClient) {}
  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiURL);
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiURL, prod, httpOptions);
  }

  supprimerProduit(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

/*   listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiURL+"/cat");
  } */

    listeCategories():Observable<CategorieWrapper>{
      return this.http.get<CategorieWrapper>(this.apiURLCat);
   }



  consulterCategorie(id: number): Categorie {
    return this.categories.find((cat) => cat.idCat == id)!;
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiURL, prod, httpOptions);
  }

  
 rechercherParCategorie(idCat: number):Observable< Produit[]> {
  const url = `${this.apiURL}/prodscat/${idCat}`;
  return this.http.get<Produit[]>(url);
    }

 
    rechercherParNom(nom: string):Observable< Produit[]> {
      const url = `${this.apiURL}/prodsByName/${nom}`;
      return this.http.get<Produit[]>(url);
      }
      


}
