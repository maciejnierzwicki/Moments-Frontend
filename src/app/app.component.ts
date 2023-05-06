import { Component, AfterViewChecked } from '@angular/core';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { Title } from '@angular/platform-browser';
import { ElementAdjustmentUtil } from './utils/element-adjustment-util';


const elements_to_adjust: Array<string> = ["home", "no_posts", "signin", "signup", "newpost", "no_post", "not_found", "reset_password"];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Moments';
  
  constructor(private titleService: Title) {
	  this.titleService.setTitle($localize`${this.title}`);
  }

  ngAfterViewChecked(): void {
    for (let el in elements_to_adjust) {
      let element_id = elements_to_adjust[el];
      ElementAdjustmentUtil.adjustElement(element_id);
    }
  }
  
  
  
}
