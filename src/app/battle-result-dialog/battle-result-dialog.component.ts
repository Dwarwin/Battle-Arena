import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-battle-result-dialog',
  templateUrl: './battle-result-dialog.component.html',
  styleUrls: ['./battle-result-dialog.component.sass']
})
export class BattleResultDialogComponent implements OnInit {

  title: string;
  resultColor: string;

  constructor(
    private dialogRef: MatDialogRef<BattleResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    this.title = this.data;
    this.resultColor = this.title === 'You Win' ? 'green' : this.title === 'You Lose' ? 'red' : 'black';
  }

  close(): void {
   this.dialogRef.close();
  }
}
