import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../PhotosHandler.service';
import { Observable } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../modal-error/modal-error.component';


@Component({
  selector: 'app-ar-see-home',
  templateUrl: './ar-see-home.component.html',
  styleUrls: ['./ar-see-home.component.css']
})
export class ArSeeHomeComponent implements OnInit {

  @Input() private code:string;

  constructor(
    private photosHandler:PhotosHandler,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  public clickedGenerateCode():void {
    if (this.photosHandler.getFavoritePhotos().length >= 1) {
      this.photosHandler.generateCode().subscribe(
        data => {
          this.code = data["arSessionCode"];
        }
      );
  } else {
      const modalRef = this.modalService.open(ModalErrorComponent);
      modalRef.componentInstance.errorMessage = {
        "title": "No Favorites selected",
        "content": "You should select at least one favorite before generating a CODE"
      };
    }
  }

}
