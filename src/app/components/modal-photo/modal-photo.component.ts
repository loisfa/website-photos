import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotosHandler } from '../../services/PhotosHandler.service';
import { Photo } from '../../models/business/Photo';

/* This component is designed to display the photo in taller, and the photo
  properties into a model window.
  */
@Component({
  selector: 'app-modal-photo',
  templateUrl: './modal-photo.component.html'
})
export class ModalPhotoComponent implements OnInit {

  @Input() public photo: Photo;

  constructor(
    public activeModal: NgbActiveModal,
    public photosHandler: PhotosHandler // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() { }

  public clickedFavorite(): void {
    this.photosHandler.getPhoto(this.photo.getId()).reverseIsFavorite();
    /* TODO: In theory, next code line is useless.
     * In Javascript (+TS): - primitive (number, string) are passed by values
     *                      - objects / arrays are passed by reference
     */
    this.photo = this.photosHandler.getPhoto(this.photo.getId());
  }

}
