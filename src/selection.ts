import { Output } from '@angular/core';
import { from } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class Selection<T> {
  private _selected: T[] = [];

  @Output()
  readonly onChange = new EventEmitter<T[]>();
  selectAll: any;

  get selected(): T[] {
    return this._selected;
  }

  isSelected(item: T): boolean {
    return this._selected.includes(item);
  }

  toggle(item: T): void {
    if (this.isSelected(item)) {
      this.deselect(item);
    } else {
      this.select(item);
    }
    this.onChange.emit(this.selected);
  }

  select(item: T): void {
    this._selected.push(item);
    this.onChange.emit(this.selected);
  }

  deselect(item: T): void {
    const index = this._selected.indexOf(item);
    if (index !== -1) {
      this._selected.splice(index, 1);
      this.onChange.emit(this.selected);
    }
  }

  clear(): void {
    this._selected = [];
    this.onChange.emit(this.selected);
  }

  toggleAll(items: T[]): void {
    if (this.selected.length === items.length) {
      this.clear();
    } else {
      for (const item of items) {
        this.select(item);
      }
    }
    this.onChange.emit(this.selected);
  }
}
