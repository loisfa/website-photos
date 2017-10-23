import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../PhotosHandler.service'
import { PhotoModel } from '../PhotoModel';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-item-photo',
  templateUrl: './item-photo.component.html',
  styleUrls: ['./item-photo.component.css']
})
export class ItemPhotoComponent implements OnInit {

  @Input() public imgProperties:Object;  // should be private, but AOT compilation fails when private

  constructor(
    public photosHandler:PhotosHandler, // should be private, but AOT compilation fails when private
    public modalService: NgbModal, // should be private, but AOT compilation fails when private
    public route:ActivatedRoute // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() {
  }

  public clickedPhoto():void {
    const modalRef = this.modalService.open(ModalPhotoComponent);
    modalRef.componentInstance.imgProperties = this.imgProperties;
  }

  public clickedFavorite():void {
    this.photosHandler.getPhoto(this.imgProperties["name"]).changeFavorite();
    this.imgProperties = this.photosHandler.getPhoto(this.imgProperties["name"]).getProperties();
  }

}
