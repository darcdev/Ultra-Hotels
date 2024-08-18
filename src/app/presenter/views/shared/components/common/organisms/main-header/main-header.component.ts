import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Button } from 'primeng/button';
import { NgIcon } from '@ng-icons/core';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [NgOptimizedImage, Button, NgIcon, IconComponent, ButtonComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {}
