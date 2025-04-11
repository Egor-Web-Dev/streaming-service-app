export class FilterMediator {
  private static filter: HTMLInputElement;
  private static handleFilterInput: () => void;

  private constructor() {}

  // Инициализация в HeaderView
  static init(filter: HTMLInputElement): void {
    if (!this.filter) {
      this.filter = filter;

      this.filter.addEventListener("input", () => {
        this.handleFilterInput();
      });
    }
  }

  // Установка в TrackListPreseneter
  static setHandleFilterInput(fn: () => void): void {
    this.handleFilterInput = fn;
  }

  static clearFilter(): void {
    if (!this.filter) {
      console.warn("The filter is not installed");
      return;
    }

    this.filter.value = "";
  }

  static filterList<T>(list: T[], filterFields: (keyof T)[]): T[] {
    const filter = this.filter;

    if (!filter) {
      console.warn("The filter is not installed");
    } else if (filter.value.length > 0) {
      const filterValue = filter.value.toLowerCase();

      const filteredList = list.filter((item) => {
        const values = filterFields.map((field) => item[field]) as string[];

        const isMatch = values.some((value) =>
          value.toLowerCase().includes(filterValue),
        );

        if (isMatch) return item;
      });

      return filteredList;
    }

    return list;
  }
}
