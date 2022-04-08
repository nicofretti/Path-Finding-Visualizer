import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate} from "@angular/animations";
import Konva from "konva";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})


export class MainComponent implements OnInit {
  private width: number = 40;
  private grid = [];
  constructor() {

  }

  ngOnInit(): void {
    // @ts-ignore
    let stage = new Konva.Stage({
      container: 'container',
      width: 800,
      height: 600 ,
    });
    let layer = new Konva.Layer();
    //make a grid width x width with rect attatched
    let y = 0; let x = 0;let size = 800/this.width;
    console.log(size);
    for(let i = 0;i<size;i++){
      for (let j = 0; j<size; j++){
        let rect = new Konva.Rect({
          x: x,
          y: y,
          width: this.width,
          height: this.width,
          fill: '#c4c4c4',
          stroke: '#ffffff',
          strokeWidth: 1,
        });
        layer.add(rect);
        // change color on mouseover when mouse is clicked
        rect.on('mouseover', function() {
          //check if the mouse is clicking

        });

        rect.on('mousedown', function () {
          let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
          this.fill(color);
        });
        x += this.width;
      }
      x = 0;
      y += this.width;

    }
    stage.add(layer);

  }

}

