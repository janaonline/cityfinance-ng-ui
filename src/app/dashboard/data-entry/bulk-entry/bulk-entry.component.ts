import { DataEntryService } from './../data-entry.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-bulk-entry',
    templateUrl: './bulk-entry.component.html',
    styleUrls: ['./bulk-entry.component.scss']
})
export class BulkEntryComponent implements OnInit {

    submitted: boolean = false;
    years: any = [];
    bulkEntryForm: FormGroup;
    filesToUpload: Array<File> = [];
    uploadResult: any;
    
    constructor(private formBuilder: FormBuilder, private dataEntryService: DataEntryService) { }

    ngOnInit() {
        this.years = ['2015-16', '2016-17', '2017-18'];
        this.bulkEntryForm = this.formBuilder.group({
            year: [this.years[0], Validators.required],	
        });
    }

    upload() {
        this.submitted = true;
        if(this.bulkEntryForm.invalid || !this.bulkEntryForm.get('year').value){
            return false;
        }
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        console.log(files);
        formData.append('year', this.bulkEntryForm.get('year').value);
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i], files[i]['name']);
        }
        console.log('form data variable :   ' + formData.toString());
        this.dataEntryService.bulkEntry(formData).subscribe(res =>{
            if(res['success']){
                this.uploadResult = res['data'];
                alert('Upload summary is available below');
            }
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }

}
