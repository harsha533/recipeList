import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { AlertComponent } from "./Alert-Window/alert/alert.component";
import { PlaceholderDirective } from "./directives/placeholder.directive";

@NgModule({
  declarations: [AlertComponent, PlaceholderDirective],
  exports: [AlertComponent, PlaceholderDirective],

  imports: [CommonModule, SharedRoutingModule],
})
export class SharedModule {}
