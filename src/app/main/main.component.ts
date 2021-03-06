import {Component, OnInit} from '@angular/core';
import Konva from "konva";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})


export class MainComponent implements OnInit {
  private map_width: number = 800;
  private map_height: number = 600;
  private cell_size: number = 25;

  private colors = {
    'cell_background': '#c4c4c4',
    'cell_stroke': '#ffffff',
    'cell_wall': '#3f3f3f',
    'cell_start': '#BA3838',
    'cell_final': '#40A338'

  }
  private layer = new Konva.Layer();
  settings_form = new FormGroup({
    draw_wall: new FormControl(false),
  });
  // Enviroment variables
  private grid: any;
  private start_cell: any;
  private final_cell: any;

  constructor() {

  }
  // method to select the color to assign to the cell
  fillColor(old_color: string) {
    if(old_color==this.colors.cell_background) {
      return this.colors.cell_wall;
    }else{
      return this.colors.cell_background;
    }
  }

  initGrid(){
    let stage = new Konva.Stage({
      container: 'container',
      width: this.map_width,
      height: this.map_height ,
    });
    stage.on("mouseleave", () => {
      this.settings_form.setValue({
        draw_wall: false,
      })
    });

    let y = 0; let x = 0;let size = 800/this.cell_size;
    this.grid = [];
    for(let i = 0;i<size;i++){
      this.grid.push([])
      for (let j = 0; j<size; j++){
        let rect = new Konva.Rect({
          x: x,
          y: y,
          width: this.cell_size,
          height: this.cell_size,
          fill: this.colors.cell_background,
          stroke: this.colors.cell_stroke,
          strokeWidth: 1,
        });
        this.grid[i].push(rect);
        this.layer.add(rect);
        // change color on mouseover when mouse is clicked
        rect.on('mouseover', () => {
          // check if mouse button is pressed
          if (this.settings_form.value.draw_wall) {
            rect.fill(this.fillColor(rect.attrs.fill));
          }

        });
        rect.on('mousedown', ()=>{
          this.settings_form.setValue({'draw_wall': true});
          rect.fill(this.fillColor(rect.attrs.fill));
        });
        rect.on('mouseup', ()=>{
          this.settings_form.setValue({'draw_wall': false});
        });

        x += this.cell_size;
      }
      x = 0;
      y += this.cell_size;
    }
    stage.add(this.layer);
    // Set start position
    this.start_cell = this.grid[Math.round(size/3)][(Math.round(size/6))];
    this.start_cell.fill(this.colors.cell_start);
    // Set final position
    this.final_cell = this.grid[Math.round(size/3)][(Math.round((5/6)*size))]
    this.final_cell.fill(this.colors.cell_final);
  }

  ngOnInit(): void {
    this.initGrid();


  }

}

