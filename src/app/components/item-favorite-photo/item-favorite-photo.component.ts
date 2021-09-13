import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service'
import { Photo } from '../../models/business/Photo';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

/* This component is designed to be the atomic item of the gallery
  */
@Component({
  selector: 'app-item-favorite-photo',
  templateUrl: './item-favorite-photo.component.html'
})
export class ItemFavoritePhotoComponent implements OnInit {

  @Input() public photo: Photo;  // should be private, but AOT compilation fails when private

  constructor(
    public photosHandler: PhotosHandler, // should be private, but AOT compilation fails when private
    public modalService: NgbModal, // should be private, but AOT compilation fails when private
    public route: ActivatedRoute // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() { }

  public clickedPhoto(): void {
    const modalRef = this.modalService.open(ModalPhotoComponent);
    modalRef.componentInstance.photo = this.photo;
  }

  public clickedFavorite(): void {
    this.photosHandler.getPhoto(this.photo.getId()).reverseIsFavorite();
    /* TODO: In theory, next code line is useless.
     * In Javascript (+TS): - primitive (number, string) are passed by values
     *                      - objects / arrays are passed by reference
     */
    this.photo = this.photosHandler.getPhoto(this.photo.getId());
  }

}
