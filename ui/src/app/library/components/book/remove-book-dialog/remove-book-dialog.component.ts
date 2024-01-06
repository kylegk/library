import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'remove-book-dialog',
  templateUrl: './remove-book-dialog.component.html',
  styleUrls: ['./remove-book-dialog.component.css'],
})
export class RemoveBookDialogComponent implements OnInit {
  title: string;
  constructor(
    public dialogRef: MatDialogRef<RemoveBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data?.title ?? '';
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
