import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service';
import { Observable } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

/* This component is designed for the "See <3 at home" sub-section. It hosts:
  - video tutorial
  - step by step process to guide user
  */
@Component({
  selector: 'app-ar-see-home',
  templateUrl: './ar-see-home.component.html',
  styleUrls: ['./ar-see-home.component.css']
})
export class ArSeeHomeComponent implements OnInit {

  @Input() public code:string; // should be private, but AOT compilation fails when private

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
