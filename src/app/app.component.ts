import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Brand {
  id: number;
  name: string;
}

interface FoodItem {
  srNo: number;
  foodItems: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedBrand: number | null = null;
  selectedCity: string | null = null;

  brands: Brand[] = [
    { id: 1, name: "Arby's Restaurant" },
    { id: 2, name: 'Burger King' },
    { id: 3, name: 'Subway' }
  ];

  cities: string[] = ['ROME', 'GENEVA', 'HAMBURG', 'NEW YORK'];

  displayedColumns: string[] = ['srNo', 'foodItems'];
  dataSource = new MatTableDataSource<FoodItem>([]);

  onBrandChange() {
    // Update the table data based on selected brand
    this.dataSource.data = this.getUnavailableItems(this.selectedBrand);
  }

  onSubmit() {
    if (!this.selectedBrand || !this.selectedCity) {
      alert('Please select both brand and city!');
      return;
    }
    // You can make an API call here to fetch unavailable items for the selected brand and city
    console.log('Form submitted with Brand: ', this.selectedBrand, ' City: ', this.selectedCity);
    // Update the table data based on the selected city and brand
    this.dataSource.data = this.getUnavailableItems(this.selectedBrand);
  }

  getUnavailableItems(brandId: number | null): FoodItem[] {
    // This method should retrieve the list of unavailable items based on the selected brand
    // Sample data
    if (brandId === 1) {
      return [{ srNo: 1, foodItems: 'French Fries' }];
    } else if (brandId === 2) {
      return [{ srNo: 1, foodItems: 'Onion Rings' }];
    } else {
      return [];
    }
  }
}
