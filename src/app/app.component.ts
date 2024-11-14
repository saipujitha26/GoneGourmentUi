import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';


interface Brand {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
}

interface UnavailableItem {
  srNo: number;
  foodItems: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedBrand: number | null = null;
  selectedCity: number | null = null;

  brands: Brand[] = [];
  cities: any;

  displayedColumns: string[] = ['srNo', 'foodItems'];
  dataSource = new MatTableDataSource<UnavailableItem>([]);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch all brands on component initialization
    this.apiService.getBrands().subscribe((data: Brand[]) => {
      this.brands = data;
      console.log(data);
    });
    this.apiService.getLocations(1).subscribe((data: any) => {
      this.cities = data;
      console.log(data);
    });
    
  }

  onBrandChange() {
    if (this.selectedBrand !== null) {
      // Fetch cities based on selected brand
      this.apiService.getLocations(this.selectedBrand).subscribe((data: Location[]) => {
        this.cities = data;
        console.log(data);
      });
    }
  }

  onSubmit() {
    if (this.selectedBrand && this.selectedCity) {
      // Fetch unavailable items based on selected brand and location
      this.apiService.getUnavailableItems(this.selectedCity).subscribe((data: UnavailableItem[]) => {
        this.dataSource.data = data.map((item, index) => ({ srNo: index + 1, foodItems: item.foodItems }));
      });
    } else {
      alert('Please select both brand and city!');
    }
  }
}
