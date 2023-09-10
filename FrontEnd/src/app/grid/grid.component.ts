import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { elementAt } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {
  grid: any[][] = [];
  BASE_URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    for (let i = 0; i < 10; i++) {
      this.grid.push(Array(10).fill(false));
    }
  }

  markCell(row: number, col: number) {

    if (this.grid[row][col] === 'B' || this.grid[row][col] === 'W') return
    this.grid[row][col] = 'B';

    // Send row and column data to the backend
    this.http.post<any>(`${this.BASE_URL}/mark-cell`, { row, col }).subscribe(response => {

      if (response.AImove) {
        this.grid[response.move[0]][response.move[1]] = 'W';
      }
      if (response.gameFinished)
       { //alert(response.result);

      
          if(response.result==1) Swal.fire('Congratulations!','You won the game!','success')
    

          else if(response.result==-1)  Swal.fire('Sad!','You lose the game!','error')
    
          else  Swal.fire('Draw!','warning')
    
       }
    });
  }

  showPrompt() {
    const choice = prompt('Enter to play 1st or 2nd');
    this.http.post<any>(`${this.BASE_URL}/playerOrder`, { choice }).subscribe();
  }

  ngOnInit(): void {
    this.showPrompt()

  }


  // ngAfterViewInit(): void {

  //   // Wrap every letter in a span
  //   var textWrapper = document.querySelector('.Gomuko');
  //   textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
  //   anime.timeline({loop: true})
  //     .add({
  //       targets: '.an-2 .letter',
  //       opacity: [0,1],
  //       easing: "easeInOutQuad",
  //       duration: 2250,
  //       delay: (el, i) => 150 * (i+1)
  //     }).add({
  //       targets: '.an-2',
  //       opacity: 0,
  //       duration: 1000,
  //       easing: "easeOutExpo",
  //       delay: 1000
  //     });
    
  //   }
}
