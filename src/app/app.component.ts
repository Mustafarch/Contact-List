import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts: any[] = [];
  filteredContacts: any[] = [];
  searchTerm: string = '';
  toasts: any[] = [];
  pageSize: number = 20;
  currentPage: number = 1;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
        this.filterContacts();
      },
      (error) => {
        console.error('Kişiler alınırken hata oluştu:', error);
      }
    );
  }

  filterContacts(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Filtreleme yapıldığında sayfa 1'e dönmeliyiz.
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.filterContacts();
  }

  showToast(): void {
    const toast = {
      isVisible: true,
      timer: setTimeout(() => {
        this.hideToast(toast);
      }, 3000)
    };

    this.toasts.push(toast);
  }

  hideToast(toast: any): void {
    toast.isVisible = false;
    const index = this.toasts.indexOf(toast);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }

  deleteContact(index: number): void {
    this.filteredContacts.splice(index, 1);
    this.showToast();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredContacts.length / this.pageSize);
  }

  getCurrentPageContacts(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredContacts.slice(startIndex, endIndex);
  }

  getPagesArray(): number[] {
    const totalPages = this.totalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
