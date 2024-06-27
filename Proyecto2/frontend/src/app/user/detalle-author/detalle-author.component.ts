import { AutorService } from './../services/autor.service';
import { Autor } from '../interfaces/autor.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-author',
  templateUrl: './detalle-author.component.html',
  styleUrl: './detalle-author.component.css'
})
export class DetalleAuthorComponent implements OnInit {
  autor: Autor | undefined;
  defaultImageUrl: string = '../../../assets/autor.png';

  constructor(private route: ActivatedRoute, private autorService: AutorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.autorService.getAutorById(id).subscribe(autor => {
          this.autor = autor;
        });
      }
    });
  }
  imgError(event: any): void {
    event.target.src = this.defaultImageUrl;
  }
}