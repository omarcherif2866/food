import { Component, Inject, OnInit } from '@angular/core';
import { PlatsComponent } from '../plats/plats.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecialiteService } from '../service/specialite/specialite.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../service/core/core.service';
import { Specialite } from '../Models/specialite/specialite';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {
  specForm!: FormGroup;
  specialite: Specialite = {
    _id:'',
    name: '',
    description: '',
    isChecked: true,
    specImg: ''
  };

  specialites: Specialite[] = [];

  constructor(
    private _fb: FormBuilder,
    private _specService: SpecialiteService,
    private dialog:MatDialog,
    private _dialogRef: MatDialogRef<SpecialiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.specForm = this._fb.group({
      name : [''],
      description : [''],
      specImg : ['' ],

    })

     this.getSpecialites()

    if(this.data) {
      this.specForm.controls['name'].setValue(this.data.name);
      this.specForm.controls['description'].setValue(this.data.description);
      this.specForm.controls['specImg'].setValue(this.data.specImg);

  }
  }



  Suivant(){
    this.dialog.open(PlatsComponent)
    this._dialogRef.close(true);

  }


  onFormSubmit() {
    console.log(this.specForm.valid)
    if (this.specForm.valid) {
      if (this.data) {
        const formData = new FormData();
        formData.append('name', this.specForm.value.name);
        formData.append('description', this.specForm.value.description);

        // Vérifier si un nouveau fichier a été sélectionné
        if (this.specForm.value.specImg instanceof File) {
          formData.append('specImg', this.specForm.value.specImg);
        }

        this._specService.updateSpecialite(this.data._id, formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Specialite detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {

        const formData = new FormData();
        formData.append('name', this.specForm.value.name);
        formData.append('description', this.specForm.value.description);
        formData.append('specImg', this.specForm.value.specImg);

        this._specService.addSpecialite(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Ingredient added successfully');
            this._dialogRef.close(true);
            this.dialog.open(SpecialiteComponent)

          },
          error: (err: any) => {
            console.error(err);
          },
        });



    }

}
}

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.specForm.get('specImg')?.setValue(file);

    }

    getSpecialites(){
      this._specService.getSpecialiteList().subscribe(
        (specialites: Specialite[]) => {
          this.specialites = specialites;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }

}
