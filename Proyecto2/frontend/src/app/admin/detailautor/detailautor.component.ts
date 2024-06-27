import { Autor } from './../../user/interfaces/autor.interface';
import { AutorService } from './../../user/services/autor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailautor',
  templateUrl: './detailautor.component.html',
  styleUrl: './detailautor.component.css'
})
export class DetailautorComponent implements OnInit {
  autor: Autor | undefined;

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
}