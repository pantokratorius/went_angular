import { Component, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pogruzki.html',
  styleUrls: ['./pogruzki.css'],
})
export class Pogruzki {

  data = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // pagination state
  page = signal(1);
  pageSize = signal(5);

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<any[]>('/api/pogruzki/getAll').subscribe({
      next: (res) => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load data');
        this.loading.set(false);
      }
    });
  }

  // computed paginated data
  paginatedData = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.data().slice(start, end);
  });

  totalPages = computed(() =>
    Math.ceil(this.data().length / this.pageSize())
  );

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
    }
  }
}