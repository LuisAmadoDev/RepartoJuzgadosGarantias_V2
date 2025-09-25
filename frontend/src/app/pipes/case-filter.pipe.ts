import { Pipe, PipeTransform } from '@angular/core';
import { CaseAssignment } from '../models/case-assignment.model';

@Pipe({
  name: 'caseFilter',
  pure: false // ⚠️ Necesario para que detecte cambios en ngModel
})
export class CaseFilterPipe implements PipeTransform {
  transform(items: CaseAssignment[], filters: any): CaseAssignment[] {
    if (!items) return [];
    if (!filters) return items;

    return items.filter(item => {
      let match = true;

      for (const field in filters) {
        if (filters[field] && filters[field].toString().trim() !== '') {
          let itemValue = '';

          // 🔹 Si es fecha (assignedAt)
          if (field === 'assignedAt' && item.assignedAt) {
            const fecha = new Date(item.assignedAt);
            itemValue = fecha.toLocaleDateString('es-ES'); // dd/mm/yyyy
          } 
          // 🔹 Si es número
          else if (typeof item[field] === 'number') {
            itemValue = item[field].toString();
          } 
          // 🔹 Por defecto string
          else {
            itemValue = item[field] ? item[field].toString().toLowerCase() : '';
          }

          const filterValue = filters[field].toString().toLowerCase();

          if (!itemValue.toLowerCase().includes(filterValue)) {
            match = false;
            break;
          }
        }
      }

      return match;
    });
  }
}
