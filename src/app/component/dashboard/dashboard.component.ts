import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from 'src/app/interface/usuario';

import { AuthenticationService } from "../../service/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public usuario: Usuario;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {

      this.usuario = this.authenticationService.getUser();

  }

  ngOnInit(): void {

    const dynamicScripts = [
      'assets/include/js/perfect-scrollbar.jquery.min.js',
      'assets/include/js/waves.js',
      'assets/include/js/sidebarmenu.js',
      'assets/include/js/custom.min.js',
      'assets/include/assets/plugins/sparkline/jquery.sparkline.min.js',
      'assets/include/assets/plugins/styleswitcher/jQuery.style.switcher.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }

  }

  /**
   * logout
   */
  public logout(): void {

    this.authenticationService.logout();

    this.router.navigate(['/']);
  }

}
