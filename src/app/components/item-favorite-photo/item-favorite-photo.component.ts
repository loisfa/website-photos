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
  templateUrl: './item-favorite-photo.component.html',
  styleUrls: ['./item-favorite-photo.component.css']
})
export class ItemFavoritePhotoComponent implements OnInit {

  @Input() public photoProperties:Object;  // should be private, but AOT compilation fails when private

  constructor(
    public photosHandler:PhotosHandler, // should be private, but AOT compilation fails when private
    public modalService: NgbModal, // should be private, but AOT compilation fails when private
    public route:ActivatedRoute // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() {
  }

  public clickedPhoto():void {
    const modalRef = this.modalService.open(ModalPhotoComponent);
    modalRef.componentInstance.photoProperties = this.photoProperties;
  }

  public clickedFavorite():void {
    this.photosHandler.getPhoto(this.photoProperties["name"]).changeFavorite();
    this.photoProperties = this.photosHandler.getPhoto(this.photoProperties["name"]).getProperties();
  }

}
