import { Pipe, PipeTransform } from '@angular/core';
import { IngreEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngreEgreso[]): IngreEgreso[] {
    return items.sort((a) => {
      return a.type === 'ingreso' ? -1 : 1;
    });
  }

}
