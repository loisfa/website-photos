import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../PhotosHandler.service'
import { PhotoModel } from '../PhotoModel';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-photo-thumbnail',
  templateUrl: './photo-thumbnail.component.html',
  styleUrls: ['./photo-thumbnail.component.css']
})
export class PhotoThumbnailComponent implements OnInit {

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
