import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.dropdowndata()
  }
  dropdowndata():void{
    this.authService.getCustomFields().subscribe(
      (response) => {
        // Handle successful API response
    console.log("response,",response);

      },
      (error) => {
        // Handle API error
        console.error('API Error:', error);
      }
    )
  }

}
