import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service';
import { Photo } from '../../models/business/Photo';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/* This component is designed for the item of the photos within the gallry
  section.
  */
@Component({
  selector: 'app-thumbnail-gallery-photo',
  templateUrl: './thumbnail-gallery-photo.component.html'
})
export class ThumbnailGalleryPhotoComponent implements OnInit {

  @Input() public photo: Photo;  // should be private, but AOT compilation fails when private

  constructor(
    private photosHandler: PhotosHandler,
    private modalService: NgbModal) { }

  ngOnInit() { }

  public clickedFavorite(): void {
    this.photosHandler.getPhoto(this.photo.getId()).reverseIsFavorite();
    this.photo = this.photosHandler.getPhoto(this.photo.getId());
  }

  public clickedPhoto(): void {
    const modalRef = this.modalService.open(ModalPhotoComponent);
    modalRef.componentInstance.photo = this.photo;
  }

}
