import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // urlImg = "https://img.icons8.com/color/500/000000/partly-cloudy-rain--v1.png";
  urlImg = "../../../assets/undraw_walking_outside_re_56xo.svg"
  ciudad = "";
  clima = "";
  humedad = "";
  temperatura = 0;
  query = false;
  loanding = false;
  alerta = false;
  nombre = "";
  pais = "";

  constructor(private _climaService : ClimaService) { }

  ngOnInit(): void {
  }

  obtenerClima(){
    this.query = false;
    this.loanding= true;

    this._climaService.getClima(this.ciudad).subscribe(data => {
        this.loanding = false;
        this.temperatura = Math.round(data.main.temp - 273);
        this.clima = data.weather[0].main;
        this.humedad = data.main.humidity;
        this.nombre = data.name;
        this.pais = data.sys.country;
        this.query = true;
      }, error =>{
        this.loanding = false;
        this.error();
      }
    );
      
  }

  error(){
    this.alerta = true;
    setTimeout(() => {
      this.alerta = false;
      this.ciudad = "";
    }, 3000);
  }
}
