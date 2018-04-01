import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotosHandler } from '../PhotosHandler.service'

@Component({
  selector: 'app-modal-photo',
  templateUrl: './modal-photo.component.html',
  styleUrls: ['./modal-photo.component.css']
})
export class ModalPhotoComponent implements OnInit {

  @Input() public photoProperties:Object={};

  constructor(
    public activeModal: NgbActiveModal,
    public photosHandler:PhotosHandler // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() {
  }

  public clickedFavorite():void {
    this.photosHandler.getPhoto(this.photoProperties["name"]).changeFavorite();
    this.photoProperties = this.photosHandler.getPhoto(this.photoProperties["name"]).getProperties();
  }

}
