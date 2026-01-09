import { Component,ChangeDetectorRef } from '@angular/core';
import { SlaRule } from '../../models/sla-rule.model';
import { SlaEventService } from '../../core/services/sla.event.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sla-settings',
  imports: [CommonModule,FormsModule],
  templateUrl: './sla-settings.html',
  styleUrl: './sla-settings.css',
})
export class SlaSettings {
slaRules: SlaRule[] = [];
  loading = true;
  saving = false;
  successMessage=''
errorMessage=''
  constructor(private slaEventService: SlaEventService,private cdr:ChangeDetectorRef){
    this.loadRules();
  }

  loadRules() {
    this.loading = true;
    this.slaEventService.getSlaRules().subscribe({
      next: (data) => {
        const order = { 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
        this.slaRules = data.sort((a, b) => order[a.priority] - order[b.priority]);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load SLA rules', err);
        this.loading = false;        
        this.cdr.detectChanges();
      }
    });
  }

  saveChanges() {
    this.saving = true;
    this.slaEventService.updateSlaRules(this.slaRules).subscribe({
      next: (res:any) => {
        this.successMessage=res;
        this.saving = false;
        
        this.cdr.detectChanges();
      },
      error: (res:any) => {
        this.errorMessage='failed to do so';
        this.saving = false;
        
        this.cdr.detectChanges();
      }
    });
  }
}
