import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/* This component is designed to disaply the error of the AR section into a
  modal window.
  example of error: no favorite has been selected.
  */
@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {

  @Input() public errorMessage:Object={};

  constructor(
    public activeModal:NgbActiveModal
      // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() {
  }

  public clickedClose() {
    this.activeModal.dismiss('Cross click');
  }
}
