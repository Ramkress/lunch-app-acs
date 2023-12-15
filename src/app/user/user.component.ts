import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// import { Subscription } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // private subscription: Subscription | undefined;
  [x: string]: any;
  receivedMessage: string = ''; // Initialize with an empty string
  userId :string = ''; // Replace with your actual user ID
  month :string = 'm';
  dynamicData: string = ''; // Property to hold the dynamic data
  lastmonth : any = "";
  currentmonthcount : any = "";
  currentMonthText: string | undefined;
  previousMonthText: string | undefined;
  constructor(private authService: AuthService,private routes: Router) {}

  ngOnInit(): void {
 
  // this.authService.currentMessage.subscribe((message) => {
  //   const typedMessage = message as unknown as { user: { firstname: string ,id:string} };    
  //     this.receivedMessage = typedMessage.user.firstname;
  //     this.userId =typedMessage.user.id;
  // });

  let localStorageData = this.authService.getLoginData()
  this.receivedMessage = localStorageData.user.firstname;
  this.userId =localStorageData.user.id;


    const currentDate =new Date()
    // Get the current month
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    this.currentMonthText = currentMonth;
    
    // Get the previous month
    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(currentDate.getMonth() - 1);
    const previousMonth = previousMonthDate.toLocaleString('default', { month: 'long' });
    this.previousMonthText = previousMonth;


  this.currentmonth(this.userId, this.month)
  this.currentmonth(this.userId, "lm")

  }

  currentmonth(user: string,month: string) :void{
    this.authService.getcurrentmonthdata(user,month).subscribe(
      (response) => {
        // Handle successful API response
      if(month=="m"){
        this.currentmonthcount = response.total_count

      }else{
        this.lastmonth = response.total_count

      }

      },
      (error) => {
        // Handle API error
        console.error('API Error:', error);
      }
    );
  }
  bookTodaylunch() :void{
    console.log('kiiii')
    // this.authService.getProjectTimeEntries(this.userId, this.month)
    this.routes.navigate(["booking"]);
    // this.authService.getProjectTimeEntries(this.userId,this.month).subscribe(
    //   (response) => {
    //     // Handle successful API response
    //     console.log('API Response:', response);
  
    //   },
    //   (error) => {
    //     // Handle API error
    //     console.error('API Error:', error);
    //   }
    // );
    
  }



}
