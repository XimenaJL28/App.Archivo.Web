import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { ThemeState } from 'src/app/state/reducers/theme.reducer';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.scss']
})
export class DragndropComponent implements OnInit {
  @Input() nameFile: string = "imagen";
  @Input() uri: string = "";
  @Input() maxSizeMB: number = 5;
  themeState$: Observable<ThemeState>;
  //TODO: Verify type files
  @Input() tipeAccept!: string;
  @Output() fileDropped: EventEmitter<string> = new EventEmitter<string>();

  isUpload = false;
  porcentajeProgreso: number = 0;
  public message:string = '';

  constructor(
    public mainService: MainService,
    private readonly store: Store<{ theme: ThemeState }>) {
    mainService.xporcentaje.subscribe((resp: number) => {
      this.porcentajeProgreso = resp;
    });
    this.themeState$ = this.store.select("theme");
  }

  ngOnInit(): void {
    if (!this.tipeAccept) {
      throw new Error("Input [tipeAccept] must be provided in Dragndrop Component");
    }
  }

  onFileDropped(event: any) {
    const validImage = this._isValidImageSize(event);
    if (validImage) {
      this.uploadFile(event[0]);
    }
    this.message = !validImage ? `La imagen supera los ${this.maxSizeMB} MB` : '';
  }

  fileBrowseHandler(file: any) {
    const validFile = this._isValidImageSize(file.files[0]);
    if (validFile) {
      this.uploadFile(file.files[0]);
    }
    this.message = !validFile ? `El archivo supera los ${this.maxSizeMB} MB` : '';
  }

  async uploadFile(file: any) {
    this.isUpload = true;
    this.mainService.uploadPhoto(file).then((resp: any) => {
      this.isUpload = false;
      this.uri = resp.Uri;
      this.fileDropped.emit(this.uri);
      // return resp;
    });
  }

  _isValidImageSize(file: any): boolean {
    const fileSizeBytes = Number(file.size);
    const fileSizeMB = Number((fileSizeBytes / 1048576).toFixed(1));
    return fileSizeMB <= this.maxSizeMB;
  }
}
