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

  @Input() private imgProperties:Object;
  @Input() private heartUri:string;
  @Input() private src:string;

  constructor(
    private photosHandler:PhotosHandler,
    private modalService: NgbModal) { }

  ngOnInit() {}

  public clickedFavorite():void {
    this.photosHandler.getPhoto(this.imgProperties["name"]).changeFavorite();
    this.imgProperties = this.photosHandler.getPhoto(this.imgProperties["name"]).getProperties();
  }

  public clickedPhoto():void {
    const modalRef = this.modalService.open(ModalPhotoComponent);
    modalRef.componentInstance.imgProperties = this.imgProperties;
  }

}
