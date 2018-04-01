import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service'
import { PhotoModel } from '../../models/business/PhotoModel';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/* This component is designed for the item of the photos within the gallry
  section.
  */
@Component({
  selector: 'app-thumbnail-gallery-photo',
  templateUrl: './thumbnail-gallery-photo.component.html',
  styleUrls: ['./thumbnail-gallery-photo.component.css']
})
export class ThumbnailGalleryPhotoComponent implements OnInit {

  @Input() public photoProperties:Object;  // should be private, but AOT compilation fails when private

  constructor(
    private photosHandler:PhotosHandler,
    private modalService: NgbModal) { }

  ngOnInit() {}

  public clickedFavorite():void {
    this.photosHandler.getPhoto(this.photoProperties["name"]).changeFavorite();
    this.photoProperties = this.photosHandler.getPhoto(this.photoProperties["name"]).getProperties();
  }

  public clickedPhoto():void {
    const modalRef = this.modalService.open(ModalPhotoComponent);
    modalRef.componentInstance.photoProperties = this.photoProperties;
  }

}
